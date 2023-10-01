// const path = require("path");
const express = require("express");

const videoRoutes = require("./routes/videoRoutes");

const app = express();

app.use("/api/video", videoRoutes);

module.exports = app;
