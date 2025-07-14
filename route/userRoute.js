const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
router.get("/profile", isAuthenticated, (req, res, next) => {
    // console.log(req.user);
    const profile = req.user;
    res.render("profile", { title: "profile", profile });
});
module.exports = router;
