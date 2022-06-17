import { Router } from "express";
import { check } from "express-validator";


import { get,post,deleteUser,put } from "../controllers/user.js";
import { emailExist, idExits, rolValidator } from "../helpers/db_validators.js";
import { inputValidation } from "../middlewares/validateinputs.js";
import { validateJWS } from "../middlewares/validateJWT.js";
import {hasRole, isAdminRole} from "../middlewares/validateRole.js";

export const router = Router();

router.get('/',get);
router.put('/:id',[
    check('id','ID incorrect').isMongoId(),
    check('id').custom(idExits),
    check('role').custom(rolValidator),
    inputValidation
],put);
router.delete('/:id',[
    validateJWS,
    isAdminRole,
    hasRole('ADMIN','USER'),
    check('id','ID incorrect').isMongoId(),
    check('id').custom(idExits),
    inputValidation
],deleteUser);
router.post('/',[
    check('mail','Incorrect format in mail').isEmail(),
    check('mail').custom(emailExist),
    check('name','Name is required').not().isEmpty(),
    check('password','Password is required and the caracters must be more than 6 ').isLength({min:6}),
    check('role').custom( rolValidator ),
    //inputValidation imprime todos los errores que se tienen
    inputValidation
    ],
    post);
