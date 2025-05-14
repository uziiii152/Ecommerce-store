import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectDb = async ()=>{
   try {
     await mongoose.connect(process.env.MONGODB_URI,mongoose.connection[0])
   console.log(`mongodb is connected`);
   
} catch (error) {
    console.log(`error while connecting db`,error);
    process.exit(1) 
} 
}


