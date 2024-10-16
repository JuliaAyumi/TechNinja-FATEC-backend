import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  dotenv.config();

  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
