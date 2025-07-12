import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import connectDb from "./Libs/connectDb.js"
import apiroutes from "./routes/api.routes.js"
import coinroutes from "./routes/coin.route.js"
import CommentRoute from "./routes/comment.route.js"
import Sentiment from "./routes/sentiment.route.js"
import axios from "axios"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());

const COINGECKO_URL = "https://api.coingecko.com/api/v3";

app.use("/api/user", userRoutes);
app.use("/api/coins", apiroutes);
app.use("/api/coins", coinroutes);
app.use("/api/comments", CommentRoute);  // /api/comments/:coinId
app.use("/api", Sentiment);              // /api/sentiment/:coinId

connectDb();
app.listen(3000, () => console.log("server is running"));