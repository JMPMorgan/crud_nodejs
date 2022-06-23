import { Router } from "express";
import { check } from "express-validator";


import { inputValidation } from "../middlewares/validateinputs.js";
import { validateJWS } from "../middlewares/validateJWT.js";

import { createCategory,deleteCategory,getCategories, getCategory, updateCategory} from "../controllers/categories.js";
import { idExitsCategories } from "../helpers/db_validators.js";
import { isAdminRole } from "../middlewares/validateRole.js";

export const router= Router();


/**
 * {{url}}/api/categories
 */


//Get all categories
router.get('/',getCategories);


//Get a single category
router.get('/:id',
[check('id').custom(idExitsCategories),
inputValidation]
,getCategory);

//insert a new category
router.post('/',[
validateJWS,
check('name','The name is required ').not().isEmpty(),
inputValidation],createCategory);


//Update a category
router.put('/:id',[
    validateJWS,
    check('id').custom(idExitsCategories),
    inputValidation
],updateCategory);

//Delete a category ONLY ADMIN ROLE
router.delete('/:id',
validateJWS,
isAdminRole,
inputValidation
,deleteCategory);