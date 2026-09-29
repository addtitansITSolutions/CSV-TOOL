const fs = require("fs");
const { readUploadedFile } = require("../services/fileService");

async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file.",
    });
  }

  try {
    const data = await readUploadedFile(req.file);
    return res.status(200).json({
      success: true,
      message: "File uploaded and read successfully.",
      file: {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      },
      data: {
        columns: data.headers,
        totalRows: data.rows.length,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    fs.unlink(req.file.path, () => {});
  }
}

module.exports = { uploadFile };