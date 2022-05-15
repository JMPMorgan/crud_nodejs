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