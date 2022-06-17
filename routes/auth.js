import { check } from "express-validator";
import { router } from '../routes/user.js';
/*
instead use Router from express i use router from user.js bc you cant use different Router for the same project 
*/
import { googleSigIn, login } from "../controllers/auth.js";
import { inputValidation } from "../middlewares/validateinputs.js";
router.post('/login',[
    check('mail','Not a Email').isEmail(),
    check('password','Password Required').notEmpty(),
    inputValidation
]
,login); 


router.post('/google',[
    check('id_token','Token de google es necesario').not().isEmpty(),
    inputValidation
]
,googleSigIn);