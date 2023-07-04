"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUesr = exports.LoginUser = exports.RegisterUser = exports.GetUsers = void 0;
const Auth_1 = __importDefault(require("../models/Auth"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function GetUsers(req, res) {
    const user = await Auth_1.default.find({});
    res.status(200).json({ user });
}
exports.GetUsers = GetUsers;
async function RegisterUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hassPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await Auth_1.default.create({
            name: name,
            email: email,
            password: hassPassword
        });
        res.status(201).json({ user });
    }
    catch (err) {
        res.json({ err });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await Auth_1.default.findOne({ email: email });
        if (!user) {
            res.status(404).json({ err: `There is no email by ${email}` });
            return;
        }
        if (!email || !password) {
            res.status(400).json({ err: "please provide email or password" });
            return;
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ err: "Wrong password please try again" });
            return;
        }
        const token = user.createJWT(res);
        res.status(200).json({ user: { name: user.name, email: user.email }, token });
    }
    catch (err) {
        res.json(err);
    }
}
exports.LoginUser = LoginUser;
async function DeleteUesr(req, res) {
    const { name, email } = req.body;
    const user = await Auth_1.default.findOneAndDelete({ name: name, email: email });
    if (!user) {
        res.status(404).json({ err: "User not found" });
        return;
    }
    res.status(200).json({ result: "User Removed", user });
}
exports.DeleteUesr = DeleteUesr;
