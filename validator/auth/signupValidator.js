const { body } = require("express-validator");
module.exports = [
    body("email").trim().isEmail().withMessage("Email must be a valid email").normalizeEmail().toLowerCase(),
    body("password").trim().isLength(4).withMessage("Password length must be 4 character"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("password do not match");
        }
        return true;
    }),
];
