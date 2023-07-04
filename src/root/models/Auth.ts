import mongoose, { Model, Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import express from "express";



interface UserSchemaTypes extends Document {
    name: string;
    email: string;
    password: string;
    // createJWT(res: express.Response): string;
    createJWT: (res: express.Response) => string;
}
  


const UserSchema: Schema = new Schema<UserSchemaTypes>({
    name: {
        type:String,
        unique: true,
        index: true,
        required:[true, "please provide your name"],
        minLength:3, 
        maxLength:50
    }, 

    email: {
        type:String,
        unique: true,
        index: true,
        required:[true, "please provide your email"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide valid email"
        ]
    }, 
 
    password: {
        type:String,
        required:[true, "please provide your password"],
        minLength:6, 
    }, 


} /*{ collection: "users", timestamps: true, autoIndex: false} */);


UserSchema.set("collection", "users");
UserSchema.set("timestamps", true);
// UserSchema.set("autoIndex", false);

// UserSchema.path("email").index(true);
// UserSchema.path("email").index({ unique: true });



UserSchema.method("createJWT", function(res: express.Response) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        res.status(400).json({ err: 'JWT secret key is not defined' });
        return;
    }

    const payload = jwt.sign(
        {userId: this._id, name: this.name},
        secret,
        {expiresIn: "30d",}
    );

    return payload;
})





const UsersModel: Model<UserSchemaTypes> = model<UserSchemaTypes>("users", UserSchema);
export default UsersModel;