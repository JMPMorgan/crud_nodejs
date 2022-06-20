import { Router } from "express";
import { check } from "express-validator";


import { inputValidation } from "../middlewares/validateinputs.js";
import { validateJWS } from "../middlewares/validateJWT.js";

import { createCategory } from "../controllers/categories.js";

export const router= Router();


/**
 * {{url}}/api/categories
 */


//Get all categories
router.get('/',(req,res)=>{
 console.log('Chido');
 res.json('Chido');
});


//Get a single category
router.get('/:id',(req,res)=>{
    res.json('Una categoria');
});

//insert a new category
router.post('/',[validateJWS,
check('name','The name is required ').not().isEmpty(),
inputValidation],createCategory);


//Update a category
router.put('/:id',(req,res)=>{
    res.json('Update Categoria');
});

//Delete a category ONLY ADMIN ROLE
router.delete('/:id',(req,res)=>{
    res.json('Puf se borro!');
});