const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Check if authorization header exists and split the token
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token part

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser; // Attach user info to the request
    next(); // Continue to the next middleware
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
