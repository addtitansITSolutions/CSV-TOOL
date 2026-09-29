const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "outputs");

// Download the highlighted XLSX file
function downloadMarkedFile(req, res) {
  const { jobId } = req.params;

  // Validate the job ID to prevent path traversal
  if (!/^[a-f0-9-]{36}$/i.test(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job ID.",
    });
  }

  const filePath = path.join(
    OUTPUT_DIR,
    jobId,
    "marked.xlsx"
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "Highlighted XLSX file not found.",
    });
  }

  return res.download(filePath, "marked.xlsx", (error) => {
    if (error && !res.headersSent) {
      console.error("Marked file download error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to download the XLSX file.",
      });
    }
  });
}

// Download the selected rows CSV file
function downloadSelectedFile(req, res) {
  const { jobId } = req.params;

  // Validate the job ID to prevent path traversal
  if (!/^[a-f0-9-]{36}$/i.test(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job ID.",
    });
  }

  const filePath = path.join(
    OUTPUT_DIR,
    jobId,
    "selected.csv"
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "Selected CSV file not found.",
    });
  }

  return res.download(filePath, "selected.csv", (error) => {
    if (error && !res.headersSent) {
      console.error("Selected CSV download error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to download the CSV file.",
      });
    }
  });
}

module.exports = {
  downloadMarkedFile,
  downloadSelectedFile,
};