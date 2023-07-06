import express, { Application } from "express";
import mongoose from "mongoose";
import documentRoutes from "./src/routes/documentRoutes";
import { connectDatabase } from "./config/database";
import cors from "cors";
import logger from "./config/logger";

const app: Application = express();
const port: number = 2303;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// Connect To DB
connectDatabase();

// Routes
app.use("/", documentRoutes);

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
