const express = require("express");
const multer = require("multer");
const { uploadFile, } = require("../controllers/uploadController");

const router = express.Router();

const upload = multer(
    { dest: "uploads/",
      limits: {  
        fileSize: 20 * 1024 * 1024, // 20 MB
       },
});

router.post("/", upload.single("file"), uploadFile);

module.exports = router;