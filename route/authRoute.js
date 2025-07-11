const router = require("express").Router();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const signupValidator = require("../validator/auth/signupValidator");

const User = require("../models/User");
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});
router.post("/login", (req, res, next) => {
  res.send("<h1>This is login page</h1>");
});
router.get("/register", (req, res, next) => {
  // res.send("<h1>This is register page</h1>");
  const messages = req.flash();
  console.log(messages);
  res.render("register", { messages, title: "Register" });
  // res.send(req.body);
});
router.post("/register", signupValidator, async (req, res, next) => {
  // res.send("<h1>This is register page</h1>");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.flash("error", error.msg);
      });
      res.render("register", { messages: req.flash(), title: "Register" });
      return;
    }
    const { email } = req.body;
    const doesExist = await User.findOne({ email: email });
    if (doesExist) {
      req.flash("error", "this mail is already used. Try new one!");
      // res.render("register", { messages: req.flash(), title: "Register" });
      // console.log(req.flash("error"));

      return res.redirect("/auth/register");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();
    req.flash("success", `${user.email} has successfully registered`);
    res.redirect("/auth/login");

    // res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", (req, res, next) => {
  res.send("<h1>This is logout page</h1>");
});
module.exports = router;
