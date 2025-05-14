import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./Db/configDb.js"
import router from "./route/user.route.js";
import cors from 'cors';


await connectDb();

dotenv.config()

const port = process.env.Port

const app = express()



app.use(cors({
  origin: `http://localhost:5173`, // or "*" for development
  credentials: true
}));


app.use(express.json())

app.use('/api/user',router)

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})