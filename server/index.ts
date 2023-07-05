import express, { Application } from "express";
import mongoose from "mongoose";
import DocumentController from "./src/controllers/documentController";
import documentRoutes from "./src/routes/documentRoutes";
import { connectDatabase } from "./config/database";

const app: Application = express();
const port: number = 2302;

// Middleware
app.use(express.json());

// Connect To DB
connectDatabase();

// Routes
const documentController: DocumentController = new DocumentController();
app.use("/", documentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
