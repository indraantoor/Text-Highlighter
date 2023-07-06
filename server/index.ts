import express, { Application } from "express";
import documentRoutes from "./src/routes/documentRoutes";
import { connectDatabase } from "./config/database";
import cors from "cors";
import logger from "./config/logger";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();

const port = process.env.PORT;

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
