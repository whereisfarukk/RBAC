const router = require("express").Router();
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const { roles } = require("../utils/constantUserRole");

router.get("/users", isAuthenticated, isAdmin, async (req, res, next) => {
    const users = await User.find();
    res.render("manage-users", { title: "Manage Users", users });
});
router.post("/update-role/:id", async (req, res, next) => {
    const postId = req.params.id;
    const { role } = req.body;
    console.log(postId, role);
    if (!postId || !role) {
        req.flash("error", "Invalid request");
        return res.redirect("/admin/users");
    }
    // check for valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        req.flash("error", "Invalid id");
        return res.redirect("/admin/users");
    }

    // check for valid role
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
        req.flash("error", "Invalid Roles");
        return res.redirect("/admin/users");
    }

    // admin can't remove himself as an admin
    if (req.user._id === postId) {
        req.flash("error", "Admins cannot remove themselves from Admin, ask another admin.");
        return res.redirect("/admin/users");
    }

    // finally update the user
    const user = await User.findByIdAndUpdate(postId, { role: role }, { new: true, runValidators: true });
    req.flash("info", "Updated user role");
    res.redirect("/admin/users");
});
module.exports = router;
