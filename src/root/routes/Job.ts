import express from "express";
import { 
    GetAllJobs, GetJob, CreateJob, UpdateJob, DeleteJob
} from "../controllers/Job";

const router: express.Router = express.Router(); 

router.get("/", GetAllJobs);
router.get("/:id", GetJob);
router.post("/", CreateJob);
router.patch("/:id", UpdateJob);
router.delete("/:id", DeleteJob);


export { router };