const fs = require("fs/promises");
const path = require("path");
const ProcessHistory = require("../models/ProcessHistory");


//all history - but with pagination
async function getHistory(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const skip = (page - 1) * limit;

    const [history, totalRecords] = await Promise.all([
      ProcessHistory.find()
        .populate("user", "username email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      ProcessHistory.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    return res.status(200).json({
      success: true,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      history,
    });
  } catch (error) {
    console.error("Get history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch processing history.",
    });
  }
}

// Get one processing job
async function getHistoryById(req, res) {
  try {
    const { jobId } = req.params;

    const history = await ProcessHistory.findOne({ jobId })
      .populate("user", "username email");

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Processing history not found.",
      });
    }

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get history details error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch processing details.",
    });
  }
}


// Only allow deletion inside uploads/ and outputs/  ----------  HELPER FUNCTION
function getSafeFilePath(filePath) {
  if (!filePath) return null;

  const absolutePath = path.resolve(filePath);
  const uploadsDir = path.resolve("uploads");
  const outputsDir = path.resolve("outputs");

  const isInside = (file, directory) => {
    const relative = path.relative(directory, file);
    return (
      relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative)
    );
  };

  if (
    !isInside(absolutePath, uploadsDir) &&
    !isInside(absolutePath, outputsDir)
  ) {
    throw new Error("Invalid file path in processing history.");
  }

  return absolutePath;
}

// Delete associated files; missing files are okay  -------- HELPER FUNCTION

async function deleteJobFiles(history) {
  const filePaths = [
    history.files?.original,
    history.files?.marked,
    history.files?.selected,
  ].filter(Boolean);

  const errors = [];

  for (const filePath of filePaths) {
    try {
      const safePath = getSafeFilePath(filePath);
      await fs.unlink(safePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        errors.push({
          file: filePath,
          message: error.message,
        });
      }
    }
  }

  // Remove the jobId folder from outputs
  try {
    const jobFolder = path.resolve("outputs", history.jobId);
    const outputsDir = path.resolve("outputs");
    const relative = path.relative(outputsDir, jobFolder);

    if (
      relative &&
      !relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative)
    ) {
      await fs.rm(jobFolder, {
        recursive: true,
        force: true,
      });
    } else {
      throw new Error("Invalid job folder path.");
    }
  } catch (error) {
    errors.push({
      file: `outputs/${history.jobId}`,
      message: error.message,
    });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true };
}

// Delete files but keep history
async function deleteHistoryFiles(req, res) {
  try {
    const history = await ProcessHistory.findOne({
      jobId: req.params.jobId,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Processing history not found.",
      });
    }

    if (history.filesDeleted) {
      return res.status(200).json({
        success: true,
        message: "Files have already been deleted.",
      });
    }

    const result = await deleteJobFiles(history);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Some files could not be deleted.",
        errors: result.errors,
      });
    }

    history.filesDeleted = true;
    history.filesDeletedAt = new Date();
    history.files.original = null;
    history.files.marked = null;
    history.files.selected = null;

    await history.save();

    return res.status(200).json({
      success: true,
      message: "Files deleted successfully. History was preserved.",
    });
  } catch (error) {
    console.error("Delete history files error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete processing files.",
    });
  }
}

// Delete files and permanently remove history
async function deleteHistory(req, res) {
  try {
    const history = await ProcessHistory.findOne({
      jobId: req.params.jobId,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Processing history not found.",
      });
    }

    if (!history.filesDeleted) {
      const result = await deleteJobFiles(history);

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: "Some files could not be deleted. History was preserved.",
          errors: result.errors,
        });
      }
    }

    await ProcessHistory.deleteOne({ _id: history._id });

    return res.status(200).json({
      success: true,
      message: "Files and processing history deleted successfully.",
    });
  } catch (error) {
    console.error("Delete history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete processing history.",
    });
  }
}

module.exports = {
  getHistory,
  getHistoryById,
  deleteHistoryFiles,
  deleteHistory,
};