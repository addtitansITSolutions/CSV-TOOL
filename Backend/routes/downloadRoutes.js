const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/auth.middleware");

const {
  downloadMarkedFile,
  downloadSelectedFile,
} = require("../controllers/downloadController");

const router = express.Router();

router.get(
  "/:jobId/marked",
   authMiddleware,
  adminMiddleware,
  downloadMarkedFile
);
router.get("/:jobId/selected",
  authMiddleware,
  adminMiddleware,
  downloadSelectedFile
);

module.exports = router;