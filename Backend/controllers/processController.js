const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { readUploadedFile } = require("../services/fileService");
const { selectRows } = require("../services/selectionService");
const { generateOutputFiles } = require("../services/outputService");
const ProcessHistory = require("../models/ProcessHistory");

const ALLOWED_PERCENTAGES = [10, 20, 25, 33, 50, 100];
const ALLOWED_METHODS = ["random", "interval"];


async function processFile(req, res) {
  const uploadedFile = req.file;

  try {
    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file.",
      });
    }

    const percentage = Number(req.body.percentage);

    if (!ALLOWED_PERCENTAGES.includes(percentage)) {
      return res.status(400).json({
        success: false,
        message:
          "Please choose a percentage from the available options: 10%, 20%, 25%, 33%, 50%, or 100%.",
      });
    }

    const method = req.body.method;

    if (!ALLOWED_METHODS.includes(method)) {
      return res.status(400).json({
        success: false,
        message: "Please choose either random or interval.",
      });
    }

    const extension = path.extname(uploadedFile.originalname).toLowerCase();

    if (![".csv", ".xlsx"].includes(extension)) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or XLSX file.",
      });
    }

    // Read uploaded file
    const data = await readUploadedFile(uploadedFile);

    // Select rows
    const selectedIndexes = selectRows(
      data.rows,
      percentage,
      method
    );

    // Generate unique job ID
    const jobId = crypto.randomUUID();

    // Generate both output files
    await generateOutputFiles({
      jobId,
      originalName: uploadedFile.originalname,
      headers: data.headers,
      rows: data.rows,
      selectedRows: selectedIndexes,
      extension,
    });

    // Save processing history
    await ProcessHistory.create({
      jobId,
      user: req.user.id,
      originalFileName: uploadedFile.originalname,
      fileType: extension.slice(1),
      percentage,
      method,
      totalRows: data.rows.length,
      selectedRows: selectedIndexes.length,
      status: "completed",
      files: {
        original: uploadedFile.path,
        marked: path.join("outputs", jobId, "marked.xlsx"),
        selected: path.join("outputs", jobId, "selected.csv"),
      },
    });

    return res.status(200).json({
      success: true,
      message: "File processed successfully.",
      jobId,
      summary: {
        fileName: uploadedFile.originalname,
        totalRows: data.rows.length,
        percentage,
        method,
        selectedRows: selectedIndexes.length,
      },
      downloads: {
        markedXlsx: `/api/download/${jobId}/marked`,
        selectedCsv: `/api/download/${jobId}/selected`,
      },
    });
  } catch (error) {
    console.error("Processing error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process the uploaded file.",
    });
  } finally {
    // Remove temporary uploaded file
    if (uploadedFile?.path) {
      fs.unlink(uploadedFile.path, (error) => {
        if (error && error.code !== "ENOENT") {
          console.error("Upload cleanup error:", error);
        }
      });
    }
  }
}

module.exports = { processFile };