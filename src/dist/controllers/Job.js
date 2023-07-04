"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteJob = exports.UpdateJob = exports.CreateJob = exports.GetJob = exports.GetAllJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
async function GetAllJobs(req, res) {
    const jobs = await Job_1.default.find({});
    res.status(200).json({ jobs });
}
exports.GetAllJobs = GetAllJobs;
async function GetJob(req, res) {
    const { userId, name } = req.user;
    const { id: jobId } = req.params;
    const jobs = await Job_1.default.find({ _id: jobId, createdBy: userId });
    if (!jobs) {
        res.status(404).json({ msg: `No job with id ${jobId}` });
        return;
    }
    res.status(200).json({ name: name, jobs });
}
exports.GetJob = GetJob;
async function CreateJob(req, res) {
    const { userId, name } = req.user;
    req.body.createdBy = userId;
    const jobs = await Job_1.default.create(req.body);
    res.status(201).json({ name, jobs });
}
exports.CreateJob = CreateJob;
async function UpdateJob(req, res) {
    const { user: { userId, name }, body: { position, company }, params: { id: jobId } } = req;
    if (position === "" || company === "") {
        res.status(500).json({ err: "company or position cannot be empty" });
        return;
    }
    const jobs = await Job_1.default.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { runValidators: true });
    if (!jobs) {
        res.status(404).json({ msg: `No job with id ${jobId}` });
        return;
    }
    res.status(201).json({ name, jobs });
}
exports.UpdateJob = UpdateJob;
async function DeleteJob(req, res) {
    const { user: { userId, name }, params: { id: jobId } } = req;
    const jobs = await Job_1.default.findOneAndRemove({ _id: jobId, createdBy: userId });
    if (!jobs) {
        res.status(404).json({ msg: `No job with id ${jobId}` });
        return;
    }
    res.status(200).json({ name, jobs });
}
exports.DeleteJob = DeleteJob;
