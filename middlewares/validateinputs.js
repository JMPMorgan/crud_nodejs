import { validationResult } from "express-validator";
import mongoose from "mongoose";


export const inputValidation=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

export const objectIdCorrect=(req,res,next)=>{
    console.log(req.params.id);
    req.params.id=new mongoose.Types.ObjectId(req.params.id);
    console.log(req.params.id);
    next();
}

