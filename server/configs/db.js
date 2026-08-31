import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connection.on("error", (err) => console.log("Mongo connection error:", err.message));
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 15000,
      bufferCommands: false,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Mongo connect failed:", error.message);
    throw error;
  }
};

export default connectDb;
