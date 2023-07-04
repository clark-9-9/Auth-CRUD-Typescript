"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
const router = express_1.default.Router();
exports.router = router;
router.get('/', Auth_1.GetUsers);
router.post('/register', Auth_1.RegisterUser);
router.post("/login", Auth_1.LoginUser);
router.delete("/delete", Auth_1.DeleteUesr);
