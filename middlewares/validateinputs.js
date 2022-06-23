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
    req.params.id=new mongoose.Types.ObjectId(req.params.id);
    next();
}

