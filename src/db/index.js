import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const MONGODB_URI = process.env.MONGODB_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: DB_NAME })
    console.log("DB connected.")
  } catch (error) {
    console.log("Failed to connect DB: ", error)
  }
}