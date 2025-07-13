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
    return res.redirect("back");
  } else {
    next();
  }
};
