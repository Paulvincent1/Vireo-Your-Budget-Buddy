const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const allowedOrigins = process.env.CLIENT_URL.split(",");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running in port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
