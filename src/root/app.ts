import dotenv from 'dotenv'
dotenv.config();

import express, { Express } from "express";
import ConnectDB from "./db/ConnectDB";
import NotFound from './errors/NotFound';
import { router as authsRouter } from './routes/Auth';
import { router as jobsRouter } from './routes/Job';
import Authenticate from './middleware/Authentication';


const app: Express = express();
app.use(express.json());



//- Routes
app.use("/api/v1/auth", authsRouter);
app.use("/api/v1/jobs", Authenticate, jobsRouter);



//- Not Found Err
app.use(NotFound);




const port = process.env.PORT || 3000;

function start() {

    try {
        const URI = process.env.MONGO_URI;

        if (!URI) throw new Error('MongoDB URI is not defined');
        ConnectDB(URI);

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    } 
};

start();
