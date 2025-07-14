const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.render("index", { title: "My EJS App" });
});

module.exports = router;
