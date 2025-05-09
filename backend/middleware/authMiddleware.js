const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (authentication required)
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

// Middleware to verify admin access
exports.verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next(); // Proceed if user is an admin
};
