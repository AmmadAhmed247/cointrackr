import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import connectDb from "./Libs/connectDb.js"
dotenv.config();
const app=express();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());



app.use("/api/user",userRoutes);
connectDb();
app.listen(3000,()=>console.log("server is running"));