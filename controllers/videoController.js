const Video = require("../models/videoModel");
const fs = require("fs");

const uploadVideo = async (req, res) => {
  const { filename, path } = req.file;
  // console.log({ req });
  try {
    const video = new Video({ filename, path });
    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: "Error uploading video", error });
  }
};

const getVideoById = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving video", error });
  }
};

const streamVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    if (fs.existsSync(video.path)) {
      const stat = fs.statSync(video.path);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(video.path, { start, end });
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);
        file.pipe(res);
      } else {
        const headers = {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        };
        res.writeHead(200, headers);
        fs.createReadStream(video.path).pipe(res);
      }
    } else {
      res.status(404).json({ message: "Video file not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  uploadVideo,
  getVideoById,
  streamVideo,
};
