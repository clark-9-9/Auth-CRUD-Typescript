import JobModel from "../models/Job";
import { Request, Response } from "express";

async function GetAllJobs(req: Request, res: Response) {
    const jobs = await JobModel.find({  }); 
    
    res.status(200).json({ jobs });
}


async function GetJob(req: Request, res: Response) {
    const { userId, name } = req.user;
    const{ id: jobId } = req.params;
    const jobs = await JobModel.find({ _id: jobId, createdBy: userId }); 

    if(!jobs) {
        res.status(404).json({ msg: `No job with id ${jobId}` });
        return;
    }
    
    res.status(200).json({ name: name, jobs });
}



async function CreateJob(req: Request, res: Response) {
    const { userId, name } = req.user;

    req.body.createdBy = userId;
    const jobs = await JobModel.create(req.body);
    res.status(201).json({ name , jobs });
}



async function UpdateJob(req: Request, res: Response) {
    const { 
        user: { userId, name } ,
        body: { position, company },
        params: { id: jobId }
    } = req;

    if(position === "" || company === "") {
        res.status(500).json({ err: "company or position cannot be empty" });
        return;
    }

    const jobs = await JobModel.findOneAndUpdate(
        { _id: jobId, createdBy: userId }, 
        req.body,
        { runValidators: true }
    ); 

    if(!jobs) {
        res.status(404).json({ msg: `No job with id ${jobId}` });
        return;
    }

    res.status(201).json({ name, jobs });
}



async function DeleteJob(req: Request, res: Response) {
    const { 
        user: { userId, name } ,
        params: { id: jobId }
    } = req;

    const jobs = await JobModel.findOneAndRemove({ _id:jobId, createdBy:userId });

    if(!jobs) {
        res.status(404).json({ msg: `No job with id ${jobId}` });
        return;
    }

    res.status(200).json({ name, jobs });
}

export { 
    GetAllJobs, GetJob, CreateJob, UpdateJob, DeleteJob
}