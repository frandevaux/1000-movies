const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie");

const app = express();

const PORT = process.env.API_PORT || 9000;

// Middlewares

app.use(express.json());
app.use("/api", movieRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database connection failed");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
