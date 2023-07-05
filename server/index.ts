import express, { Application } from "express";
import mongoose from "mongoose";
import DocumentController from "./src/controllers/documentController";
import documentRoutes from "./src/routes/documentRoutes";
import { connectDatabase } from "./config/database";
import cors from "cors";

const app: Application = express();
const port: number = 2302;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connect To DB
connectDatabase();

// Routes
const documentController: DocumentController = new DocumentController();
app.use("/", documentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
