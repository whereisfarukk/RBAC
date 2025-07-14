const { roles } = require("../utils/constantUserRole");

exports.isAuthenticated = (req, res, next) => {
    // console.log("user object", req.user.isLoggedIn);
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect("/auth/login");
    }
};
exports.isUnAuthenticated = (req, res, next) => {
    // console.log("user object", req.user.isLoggedIn);
    if (req.isAuthenticated()) {
        return res.redirect("/auth/login");
    } else {
        next();
    }
};
exports.isAdmin = (req, res, next) => {
    // console.log("user object", req.user.isLoggedIn);
    if (req.user.role === roles.admin) {
        next();
    } else {
        return res.redirect("/");
    }
};
