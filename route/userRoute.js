const router = require("express").Router();
router.get("/profile", (req, res, next) => {
  res.send("<h1>This is the Profile page</h1>");
});
module.exports = router;
