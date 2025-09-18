// /functions/api/config/db.js
// Connect to D1 in Cloudflare
export const connectDB = (env) => {
  if (!env.DB) {
    throw new Error("❌ D1 database binding (env.DB) is missing.");
  }
  return env.DB;
};


//import mongoose from "mongoose";

//import dotenv from 'dotenv';//import.meta.env is typically used in Vite's frontend code, and it doesn’t directly
//  work in Node.js (backend) code

//dotenv.config();  // Load environment variables from .env file

/* 
export const connectDB = async (retries = 8, delay = 5000) => {  // Retry 5 times, 5 seconds delay
    try {
        const conn = await mongoose.connect(process.env.VITE_DATABASE_URL);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`❌Error connecting to MongoDB: ${error.message}`);
        
        if (retries === 0) {
            console.log("💥Max retries reached. Exiting...");
            process.exit(1);  // Exit after max retries
        } else {
            console.log(`👉Retrying connection... attempts left: ${retries}`);
            setTimeout(() => connectDB(retries - 1, delay), delay);  // Retry after delay
        }
    }
}

 */
