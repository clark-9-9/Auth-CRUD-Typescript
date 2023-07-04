import express from 'express';
import { 
    GetUsers, RegisterUser, LoginUser, DeleteUesr
} from '../controllers/Auth';

const router: express.Router = express.Router(); 


router.get('/', GetUsers);
router.post('/register', RegisterUser);
router.post("/login", LoginUser);
router.delete("/delete", DeleteUesr);


export { router };