import express from "express";
import { getSentimentStats, voteSentiment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// GET sentiment stats for a coin (no auth required to read stats)
router.get("/sentiment/:coinId", getSentimentStats);

// POST sentiment vote for a coin (auth required to vote)
router.post("/sentiment/:coinId", verifyToken, voteSentiment);

export default router;