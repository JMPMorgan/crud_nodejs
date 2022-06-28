import { Router } from "express";
import { check } from "express-validator";



import { getProducts,getProduct,createProduct,updateProduct,deleteProduct } from "../controllers/products.js";
import { idExitsCategories, idExitsProduct } from "../helpers/db_validators.js";
import { inputValidation } from "../middlewares/validateinputs.js";
import { validateJWS } from "../middlewares/validateJWT.js";
import { isAdminRole } from "../middlewares/validateRole.js";
export const router =Router();


router.get('/',getProducts);

router.get('/:id',
[check('id').custom(idExitsProduct),
inputValidation],
getProduct);

router.post('/',
[validateJWS,
check('name','The Name is required').not().isEmpty(),
check('price','The Price is required').not().isEmpty(),
check('price','The Price must be a Number').isNumeric(),
check('id_category','No es un Mongo ID').isMongoId(),
check('id_category').custom(idExitsCategories),
check('description').not().isEmpty(),
inputValidation
],
createProduct);


router.put('/:id',[
validateJWS,
check('id').custom(idExitsProduct),
check('name','The Name is required').not().isEmpty(),
check('price','The Price is required').not().isEmpty(), 
check('price','The Price must be a Number').isNumeric(),
check('id_category','No es un Mongo ID').isMongoId(),
check('id_category').custom(idExitsCategories),
check('description').not().isEmpty(),
inputValidation        
],updateProduct);


router.delete('/:id',[
    validateJWS,
    isAdminRole,
    inputValidation
],deleteProduct);