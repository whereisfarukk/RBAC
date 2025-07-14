const { Schema, model } = require("mongoose");
const { roles } = require("../utils/constantUserRole");
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(roles),
            default: roles.client,
        },
    },
    { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;
