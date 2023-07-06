import mongoose from "mongoose";
import * as redis from "redis";
import { promisify } from "util";

// Create a Redis client
const redisClient = redis.createClient({
  legacyMode: true,
});

redisClient.connect().then(() => {
  console.log("Redis Db Connected");
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

// Promisify Redis functions for easier use with async/await
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);

const mongoURI: string = "mongodb://0.0.0.0:27017/SmartDocs";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error
  }
};
