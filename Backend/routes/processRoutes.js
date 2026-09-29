const express = require("express");
const multer = require("multer");

const authMiddleware = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/auth.middleware");

const { processFile } = require("../controllers/processController");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  processFile
);

module.exports = router;