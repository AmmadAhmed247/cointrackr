import Comment from "../models/comment.model.js";
import Sentiment from "../models/sentimentvote.model.js";

// -------------------- COMMENTS --------------------

export const createComment = async (req, res) => {
  try {
    // Debug logging
    console.log("Headers:", req.headers);
    console.log("User from req:", req.user);
    console.log("Body:", req.body);
    console.log("Params:", req.params);

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      console.log("Authentication failed - no user found");
      return res.status(401).json({ error: "Login required to post a comment" });
    }

    const { description } = req.body;
    const { coinId } = req.params;

    // Validation
    if (!description || description.trim().length === 0) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!coinId) {
      return res.status(400).json({ error: "Coin ID is required" });
    }

    console.log("Creating comment for user:", req.user.id);

    const newComment = new Comment({
      description: description.trim(),
      user: req.user.id,
      coinId,
    });

    await newComment.save();
    await newComment.populate("user", "username");
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getComment = async (req, res) => {
  try {
    const { coinId } = req.params;

    if (!coinId) {
      return res.status(400).json({ error: "Coin ID is required" });
    }

    const comments = await Comment.find({ coinId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// -------------------- SENTIMENT --------------------

export const voteSentiment = async (req, res) => {
  try {
    // Check authentication for sentiment voting too
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Login required to vote on sentiment" });
    }

    const { coinId } = req.params;
    const { sentiment } = req.body;

    if (!coinId) {
      return res.status(400).json({ error: "Coin ID is required" });
    }

    if (!sentiment || !['bullish', 'bearish'].includes(sentiment.toLowerCase())) {
      return res.status(400).json({ 
        error: "Valid sentiment is required (bullish or bearish)" 
      });
    }

    const existing = await Sentiment.findOneAndUpdate(
      { user: req.user.id, coinId },
      { sentiments: sentiment.toLowerCase() },
      { new: true, upsert: true }
    );

    res.status(200).json(existing);
  } catch (error) {
    console.error("Error voting sentiment:", error);
    res.status(500).json({ error: "Failed to record sentiment vote" });
  }
};

export const getSentimentStats = async (req, res) => {
  try {
    const { coinId } = req.params;

    if (!coinId) {
      return res.status(400).json({ error: "Coin ID is required" });
    }

    const stats = await Sentiment.aggregate([
      { $match: { coinId } },
      { $group: { _id: "$sentiments", count: { $sum: 1 } } }
    ]);

    const response = { bullish: 0, bearish: 0 };

    stats.forEach((item) => {
      if (item._id === 'bullish' || item._id === 'bearish') {
        response[item._id] = item.count;
      }
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching sentiment stats:", error);
    res.status(500).json({ error: "Failed to fetch sentiment statistics" });
  }
};