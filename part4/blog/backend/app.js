const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

const app = express();
app.use(express.json());
logger.info("Connecting to mongoDB : ", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongoDB.");
  })
  .catch((error) => {
    logger.error("Error connecting to mongodb", error.message);
  });

app.use(express.static("dist"));

app.use(middleware.requestLogger);
//Api routes
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
