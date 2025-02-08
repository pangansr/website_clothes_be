import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Đọc biến môi trường từ file .env

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "MONGO_URI=mongodb+srv://user:123456aA@%40mydb.npp4k.mongodb.net/mydb?retryWrites=true&w=majority&appName=mydb"; 
        await mongoose.connect(uri, {
            // useNewUrlParser: true,
           // useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
     } catch (error) {
            if (error instanceof Error) {
                console.error("MongoDB connection failed:", error.message);
            } else {
                console.error("MongoDB connection failed:", error);
            }
            process.exit(1);
        }
        
};

export default connectDB;

