import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log(
      `Successfully connected to MongoDb database ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
