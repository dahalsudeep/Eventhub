const express = require("express");
const { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, updatePassword} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUserProfile);
router.get("/users", protect, getAllUsers);
router.put("/user", protect, updateUserProfile);
router.put("/user/password", protect, updatePassword);




module.exports = router;
