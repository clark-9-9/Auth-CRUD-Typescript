import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface PayloadType {
    userId: string; 
    name: string 
}

  
async function Authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ err: "Authentication Invalid" });
        return;
    } 

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            res.status(500).json({ err: "JWT secret key is not defined" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, secret) as PayloadType;
        req.user = { userId: payload.userId, name: payload.name};

        next();

    } catch(err) {
        res.status(500).json({ err })
    }

}




export default Authenticate;