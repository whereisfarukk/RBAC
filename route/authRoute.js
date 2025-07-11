const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});
router.post("/login", (req, res, next) => {
  res.send("<h1>This is login page</h1>");
});
router.get("/register", (req, res, next) => {
  // res.send("<h1>This is register page</h1>");
  req.flash("error", "some error message");
  req.flash("error", "second error message");
  req.flash("key", "some key message");
  const messages = req.flash();
  console.log(messages);
  res.render("register", { messages, title: "Register" });
  // res.send(req.body);
});
router.post("/register", async (req, res, next) => {
  // res.send("<h1>This is register page</h1>");
  try {
    const { email } = req.body;
    const doesExist = await User.findOne({ email: email });
    if (doesExist) {
      return res.redirect("/auth/register");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", (req, res, next) => {
  res.send("<h1>This is logout page</h1>");
});
module.exports = router;
