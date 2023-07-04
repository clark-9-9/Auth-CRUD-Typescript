"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        required: [true, "please provide your name"],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: [true, "please provide your email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please provide your password"],
        minLength: 6,
    },
} /*{ collection: "users", timestamps: true, autoIndex: false} */);
UserSchema.set("collection", "users");
UserSchema.set("timestamps", true);
// UserSchema.set("autoIndex", false);
// UserSchema.path("email").index(true);
// UserSchema.path("email").index({ unique: true });
UserSchema.method("createJWT", function (res) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(400).json({ err: 'JWT secret key is not defined' });
        return;
    }
    const payload = jsonwebtoken_1.default.sign({ userId: this._id, name: this.name }, secret, { expiresIn: "30d", });
    return payload;
});
const UsersModel = (0, mongoose_1.model)("users", UserSchema);
exports.default = UsersModel;
