import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import notesRoutes from "./routes/notesroutes.js"; // Your routes

dotenv.config(); // Load .env variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

connectDB();

// Routes
app.use("/api/notes", notesRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
