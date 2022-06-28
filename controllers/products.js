import Product from "../models/product.js";


export const createProduct=async(req,res)=>{
const {name, price,id_category,description}= req.body;
const productDB= await Product.findOne({name});
    if(productDB){
        return res.status(400).json({
            msg:`The Category ${name} already exits`
        });
    }
    console.log(req.uid);
    const data={
        name,
        price,
        category:id_category,
        description,
        available:true,
        user:req.uid
    }
    console.log('Aqui');
    const product= new Product(data);
    await product.save();
    return res.status(200).json({
        msg:`Product created Succesful`
    });
}

export const getProducts=async(req,res)=>{
    const productDB= await Product.find({status:true}).populate('category');
    const lengthProductsDB=productDB.length;
    if(productDB){
        return res.status(200).json({
            productDB,
            totalProducts:lengthProductsDB
        });
    }
}

export const getProduct=async(req,res)=>{
    const id= req.params.id;
    if(id){
        const productDB= await Product.findById({_id:id}).populate('user category');
        if(productDB){
            return res.status(200).json({
                productDB
            });
        }else{
            return  res.status(404).json({
                msg:`Product not Found or not Exits`
            });
        }
    }
    else{
        return res.status(400).json({
            msg:`Product id is required`
        }); 
    }
}

export const updateProduct=async(req,res)=>{
    const {name, price,id_category,description,available}= req.body;
    const productDB= await Product.findOne({name});
    if(productDB){
        return res.status(400).json({
            msg:`Product Name Already Exits`
        });
    }
    const data={
        name,
        price,
        category:id_category,
        description,
        available
    }
    const id = req.params.id;
    if(data && id){
        await Product.findByIdAndUpdate({_id:id},data);
        return res.status(200).json({
            msg:`Update Completed`
        });
    }else{
        return res.status(400).json({
            msg:`ID AND Category Name is Required` 
        });
    }
}


export const deleteProduct= async(req,res)=>{
    const id= req.params.id;
    if(id){
        await Product.findByIdAndUpdate({_id:id},{status:false});
        return res.status(200).json({
            msg:`Delete Completed`
        });
    }else{
        return res.status(400).json({
            msg:`ID is required`
        });
    }
}
