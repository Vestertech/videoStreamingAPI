const Video = require("../models/videoModel");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { Readable } = require("stream");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
ffmpeg.setFfmpegPath(ffmpegPath);

// Function to extract audio from video
function extractAudioFromVideo(videoPath, audioFilename) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(audioFilename)
      .noVideo()
      .on("end", () => {
        console.log("Audio extracted successfully.");
        resolve();
      })
      .on("error", (err) => {
        reject(new Error(`Error extracting audio: ${err.message}`));
      })
      .run();
  });
}

// Function to transcribe audio
async function transcribeAudio(filename) {
  const transcript = await openai.filename.transcriptions.create({
    file: fs.createReadStream(filename),
    model: "whisper-1",
  });
  return transcript.data.text;
}

const transcribeVideo = async (req, res) => {
  const { videoId } = req.params;

  // Extract audio from the video
  const videoPath = `./uploads/${videoId}.mp4`;
  const audioFilename = `./uploads/${videoId}_audio.wav`;

  try {
    await extractAudioFromVideo(videoPath, audioFilename);
    const transcription = await transcribeAudio(audioFilename);
    res.json({ transcription });
  } catch (error) {
    res.status(500).json({ message: "Error transcribing video audio", error });
  }
};

module.exports = {
  transcribeVideo,
};
