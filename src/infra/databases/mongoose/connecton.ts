import mongoose from "mongoose";

/**
 * MongoDB client instance for interacting with the database.
 *
 * @constant
 * @type {MongoClient}
 */

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/clean");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
