"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Job_1 = require("../controllers/Job");
const router = express_1.default.Router();
exports.router = router;
router.get("/", Job_1.GetAllJobs);
router.get("/:id", Job_1.GetJob);
router.post("/", Job_1.CreateJob);
router.patch("/:id", Job_1.UpdateJob);
router.delete("/:id", Job_1.DeleteJob);
