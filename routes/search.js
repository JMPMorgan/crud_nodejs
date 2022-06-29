import  Router from "express";
import { search } from "../controllers/search.js";

export const router=Router();

router.get('/:colection/:term',search)