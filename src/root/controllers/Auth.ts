import UsersModel from "../models/Auth";
import { Request, Response } from "express"; 
import bcrypt from "bcryptjs";


async function GetUsers(req: Request, res: Response) {
    const user = await UsersModel.find({ });
    res.status(200).json({ user });
}



async function RegisterUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
        const salt =  await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(password, salt);

        const user = await UsersModel.create({
            name: name,
            email: email,
            password: hassPassword
        });
        
        res.status(201).json({ user })
    } catch(err) {
        res.json({ err });
    }
}



async function LoginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    
    try {
        const user = await UsersModel.findOne({ email: email });

        if(!user) {
            res.status(404).json({ err: `There is no email by ${email}` });
            return;
        }
        
        if(!email || !password) { 
            res.status(400).json({ err: "please provide email or password" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(!isPasswordCorrect) {
            res.status(401).json({ err: "Wrong password please try again" });
            return;
        }

        const token = user.createJWT(res);
        res.status(200).json({ user: {name: user.name, email: user.email}, token })

    } catch(err) {
        res.json(err);
    }

}



async function DeleteUesr(req: Request, res: Response) {
    const { name, email } = req.body
    const user = await UsersModel.findOneAndDelete({ name: name, email: email });

    if(!user) {
        res.status(404).json({ err: "User not found" });
        return;
    }

    res.status(200).json({ result: "User Removed", user });
}
 

export {
    GetUsers, RegisterUser, LoginUser, DeleteUesr
};