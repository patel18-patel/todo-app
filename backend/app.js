// Core Module
const path = require("path");

// External Module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // <-- Load .env file

// Local Module
const todoItemsRouter = require("./routes/todoItemsRoutes");
const errorsController = require("./controllers/errors");

const app = express();

app.use(express.urlencoded({ extended: true })); // fix body-parser warning
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to Mongo: ", err);
  });
