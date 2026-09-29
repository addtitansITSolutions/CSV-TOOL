const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/auth.middleware");

const {
  getHistory,
  getHistoryById,
  deleteHistoryFiles,
  deleteHistory,
} = require("../controllers/historyController");

const router = express.Router();

// Admin-only history routes
router.get("/", 
    authMiddleware, 
    adminMiddleware, 
    getHistory
);

router.get("/:jobId",
     authMiddleware, 
     adminMiddleware, 
     getHistoryById
);

router.delete(
  "/:jobId/files",
  authMiddleware,
  adminMiddleware,
  deleteHistoryFiles
);

router.delete(
  "/:jobId",
  authMiddleware,
  adminMiddleware,
  deleteHistory
);

module.exports = router;