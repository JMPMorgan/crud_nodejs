import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generateJWT.js';
import Usuario from  '../models/user.js';
import {googleVerify} from '../helpers/google-verify.js';

export const login = async(req,res)=>{
    try {
        const {password,mail}=req.body;
        const user=await Usuario.findOne({mail});
        if(!user){
            return res.status(400).json({
                msg:'User Or Password is incorrect'
            });
        }
        if(!user.status){
            return res.status(400).json({
                msg:'User dont exits'
            });
        }

        const validPassword=bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'User Or Password is incorrect'
            });  
        }
        const token= await generateJWT(user.id);
            res.json({
                msg:'Login',
                token
            })    
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Error`});
    }
}


export const googleSigIn=async(req,res)=>{
    const {id_token}=req.body;
    try {
        
        const {name,picture,email} = await googleVerify(id_token);
        
        let user=await Usuario.findOne({mail:email});
        console.log(user);
        if(!user){
            //Create the user
            const data={
                name,
                mail:email,
                password:'hola',
                picture,
                role:'USER',
                google:true
            };
            console.log(data);
            user=new Usuario(data);
            await user.save();
        }

        if(!user.status){
            //If status is disable in DB
            return res.status(401).json({
                msg:'Talk with suporter,please'
            });
        }

        const token= await generateJWT(user.id);
        res.status(200).json({
            user,
            token,
            msg:'Usuario Creado'
        });

    
        
    } catch (error) {
        res.status(400).json({
            msg:'Error',
            msg:'Invalid Token',
            error
        })
    }
}