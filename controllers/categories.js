import Category from "../models/category.js";


export const createCategory=async(req,res)=>{
    const name=req.body.name.toUpperCase();
    const categoryDB= await Category.findOne({name});

    if(categoryDB){
       return res.status(400).json({
            msg:`The categoty ${categoryDB.name} already exists`
        });
    }


    /*
    *
    *uid comes from validateJWT where i get the id of the JWT
    */
    const data={
        name,
        user:req.uid
    }

    const category = new Category(data);
    await category.save();


}