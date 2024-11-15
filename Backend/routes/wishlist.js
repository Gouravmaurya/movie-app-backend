const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/User");
const router = express.Router();

// Add to wishlist
router.post("/add", authMiddleware, async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.user.userId);
  
  if (!user.wishlist.includes(movieId)) {
    user.wishlist.push(movieId);
    await user.save();
  }
  
  res.json({ message: "Movie added to wishlist" });
});

// Remove from wishlist
router.post("/remove", authMiddleware, async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.user.userId);
  
  user.wishlist = user.wishlist.filter((id) => id !== movieId);
  await user.save();
  
  res.json({ message: "Movie removed from wishlist" });
});

module.exports = router;
