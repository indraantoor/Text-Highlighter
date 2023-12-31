import mongoose, { mongo } from "mongoose";
import * as redis from "redis";
import { promisify } from "util";
import logger from "./logger";
import DB from "../constants/DB";

// Create a Redis client
const redisClient = redis.createClient({
  legacyMode: true,
});

redisClient.connect().then(() => {
  logger.info(`Redis DB Connected`);
});

redisClient.on("error", (err) => {
  logger.error(`Error connecting to Redis: ${err.stack}`);
});

// Promisify Redis functions for easier use with async/await
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);

const mongoURI = DB.MONGO_URI;

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    logger.info(`Connected to MongoDB`);
  } catch (error: any) {
    logger.error(`MongoDB connection error: ${error.stack}`);
    process.exit(1); // Exit the process with an error
  }
};
