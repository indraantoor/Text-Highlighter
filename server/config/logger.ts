// File: logger.ts
import winston, { format, transports } from "winston";

// Define log formats
const logFormat = format.combine(format.timestamp(), format.json());

// Create the logger
const logger = winston.createLogger({
  transports: [
    new transports.Console({
      format: logFormat,
    }),
    new transports.File({
      filename: "logs/app.log",
      format: logFormat,
    }),
  ],
});

export default logger;
