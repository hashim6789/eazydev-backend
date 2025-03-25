import mongoose from "mongoose";
import { env } from "../../../presentation/express/configs/env.config";

/**
 * MongoDB client instance for interacting with the database.
 *
 * @constant
 * @type {MongoClient}
 */

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
