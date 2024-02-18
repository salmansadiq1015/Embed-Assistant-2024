import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Successfully connected to MongoDB Database: ${conn.connection.host}`
        .bgCyan.white
    );
  } catch (error) {
    console.log("Error in MongoDB Database:", error);
  }
};

export default connectDB;
