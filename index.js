
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server!");
});

// Product routes
app.use("/api/products", productRoute);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

startServer();
