import jwt from "jsonwebtoken";
import Usuario from  '../models/user.js';
export const validateJWS=async(req,res,next)=>{
    const token=req.header('x-token');
    console.log(token);
    if(!token){
        return res.status(401).json({
            msg:"Token dont exits"
        });
    }
    try {
       const {uid} = jwt.verify(token,process.env.SPK);
       req.uid=uid;
        const userAuth=await Usuario.findById(uid);
        if(!userAuth.status){
            return res.status(401).json({
                msg:'User Dont Exits'
            });
        }
        req.userAuth=userAuth;
        next();    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Invalid Token'
        })
    }
    
}