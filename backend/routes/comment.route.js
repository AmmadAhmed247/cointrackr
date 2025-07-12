import express from "express";
import { createComment, getComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// GET comments for a coin (no auth required to read comments)
router.get("/:coinId", getComment);

// POST comment for a coin (auth required to create comments)
router.post("/:coinId", verifyToken, createComment);

export default router;