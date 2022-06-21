import { Router } from "express";
import { check } from "express-validator";


import { inputValidation } from "../middlewares/validateinputs.js";
import { validateJWS } from "../middlewares/validateJWT.js";

import { createCategory,deleteCategory,getCategories, getCategory, updateCategory} from "../controllers/categories.js";

export const router= Router();


/**
 * {{url}}/api/categories
 */


//Get all categories
router.get('/',getCategories);


//Get a single category
router.get('/:id',getCategory);

//insert a new category
router.post('/',[validateJWS,
check('name','The name is required ').not().isEmpty(),
inputValidation],createCategory);


//Update a category
router.put('/:id',updateCategory);

//Delete a category ONLY ADMIN ROLE
router.delete('/:id',deleteCategory);