import { Router } from "express";
import { check } from "express-validator";



import { getProducts,getProduct,createProduct,updateProduct,deleteProduct } from "../controllers/products.js";
export const router =Router();


router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',createProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);