import express, { Application } from "express";
import mongoose from "mongoose";
import DocumentController from "./src/controllers/documentController";

const app: Application = express();
const port: number = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURI: string = "mongodb://localhost:27017/mydatabase";
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
const documentController: DocumentController = new DocumentController();
app.use("/", documentController.router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
