import mongoose, { Model, Schema, model, Document } from "mongoose";
import express from "express";


interface JobSchemaType extends Document {
    company: string,
    position: string,
    status: ("interview" | "declined" | "pending") | "pending",
    createdBy: mongoose.Types.ObjectId | undefined,
    location: string | "My City",
    jobType: string | 'remote'
}


const JobSchema = new Schema<JobSchemaType>({
    company:{
        type:String,
        required:[true, "Please provide company name"],
        maxLength:50
    },
    
    position:{
        type:String,
        required:[true, "Please provide position name"],
        maxLength:50
    },
    
    status:{
        type:String,
        enum:["interview", "declined", "pending"],
        default: "pending"
    },
    
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:[true, "Please provide user"]
    },
    
    location:{
        type:String,
        default:"My City"
    },

    jobType:{
        type:String,
        default: "remote"
    }

})

JobSchema.set("collection", "jobs");
JobSchema.set("timestamps", true);


const JobModel: Model<JobSchemaType> = model<JobSchemaType>('jobs', JobSchema);
export default JobModel;