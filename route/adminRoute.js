const router = require("express").Router();
const User = require("../models/User");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
router.get("/users", isAuthenticated, isAdmin, async (req, res, next) => {
  const users = await User.find();
  res.send(users);
});
module.exports = router;
