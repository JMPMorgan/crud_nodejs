import Category from '../models/category.js';
import Product from '../models/product.js';
import Role from  '../models/role.js';
import Usuario from  '../models/user.js';

export const rolValidator=async(role ='')=>{
    const existRole=await Role.findOne({role});
    if(!existRole){
        throw new Error(`${role} not exits in the DB`);
    }
}

export const emailExist=async (mail='')=>{
    const exits=await Usuario.findOne({mail});
    if(exits){
        throw new Error(`${mail} is already registered in DB`)
    }
}


export const idExits=async (id='')=>{
    /*
    Si se desea enviar como objeto debemos colocar el _id para que sepa que se esta buscando por id
    */
    const exits=await Usuario.findById({_id:id});
    if(!exits){
        throw new Error(`ID not exists`)
    }
}

export const idExitsCategories = async(id='')=>{
    
        const exits=await Category.findById({_id:id});
        if(!exits){
            throw new Error('ID Not exists');
        }
    
}

export const idExitsProduct=async(id='')=>{
    const exists= await Product.findById({_id:id});
    if(!exists){
        throw new Error('ID Not Exits');
    }
}