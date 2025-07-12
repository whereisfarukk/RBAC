const router = require("express").Router();
router.get("/profile", (req, res, next) => {
  // console.log(req.user);
  const profile = req.user;
  res.render("profile", { title: "profile", profile });
});
module.exports = router;
