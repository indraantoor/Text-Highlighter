import mongoose from "mongoose";

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
