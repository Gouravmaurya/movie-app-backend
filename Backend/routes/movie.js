const express = require("express");
const axios = require("axios");
const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");

router.get("/mcu-movies", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      "https://mcuapi.herokuapp.com/api/v1/movies"
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch MCU movies" });
  }
});

module.exports = router;
