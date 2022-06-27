
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

    return res.status(201).json({
        msg:`Category created succesful`
    });


}


export const getCategories=async(req, res)=>{
    const categoriesDB= await Category.find({status:true}).populate('user');
    const lengthCategoriesDB=categoriesDB.length;
    if(categoriesDB){
        return res.status(200).json({
            categoriesDB,
            totalCategories:lengthCategoriesDB
        });
    }else{

    }
}

export const getCategory=async(req,res)=>{
    const id=req.params.id;
    if(id){
        const categoryDB=await Category.findById({_id:id}).populate('user');
        if(categoryDB){
            return res.status(200).json({
                categoryDB
            });
        }else{
            return res.status(204).json({
                msg:`Category Not found or not Exits`
            });
        }
    }else{
        return res.status(400).json({
            msg:`Category Name is required`
        });
    }
    
}

export const updateCategory=async(req,res)=>{
    const name = req.body.name.toUpperCase();
    const categotyDB=await Category.findOne({name});
    if(categotyDB){
        return res.status(400).json({
            msg:`Name Category already exits`
        });
    }
    const id=req.params.id;
    if(name && id){
        await Category.findByIdAndUpdate({_id:id},{name});
        return res.status(200).json({
            msg:`Update Completed`
        });
    }else{
        return res.status(400).json({
            msg:`ID And Category Name is required`
        });
    }
}

export const deleteCategory=async(req,res)=>{
    const id=req.params.id;
    if(id){
        await Category.findByIdAndUpdate({_id:id},{status:false});
        return res.status(200).json({
            msg:`Delete Completed`
        });
    }else{
        return res.status(400).json({
            msg:`ID  is required`
        });
    }
}