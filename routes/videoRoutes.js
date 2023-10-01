const express = require("express");
const videoController = require("../controllers/videoController");
const transcribeController = require("../controllers/transcribeController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single("video"), videoController.uploadVideo);
router.get("/:videoId", videoController.getVideoById);
router.get("/stream/:videoId", videoController.streamVideo);
router.get("/transcribe/:videoId", transcribeController.transcribeVideo);

module.exports = router;
