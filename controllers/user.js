import bcryptjs from 'bcryptjs';
import Usuario from  '../models/user.js';
export const get=async (req,res)=>{
    const {limit =5,from=0 }=req.query;
    const query={status:true};

    /*
    Tip:Cuando se tiene multiples promesas es mejor mandar un promise all,
    ya que es mas rapido que resolver sus promesas una por una
    */
    const [total,usuarios]=await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);
    res.json({total,usuarios});
}

export const post=async (req,res)=>{

    const {name,mail,password,role}=req.body;
    const user= new Usuario({name,mail,password,role});

    const salt=bcryptjs.genSaltSync();
    user.password=bcryptjs.hashSync(user.password,salt);

    await user.save();
    res.json({msg:'Hola en post',user});
}

export const put = async(req,res)=>{
    const {id}=req.params;
    const {password,google,mail,...rest}=req.body;
    if(password){
        const salt=bcryptjs.genSaltSync();
        rest.password=bcryptjs.hashSync(password,salt);
    }
    const user = await Usuario.findByIdAndUpdate(id,rest);
    res.json({msg:'Hola en put',user});
}

export const deleteUser = async (req,res)=>{
    const {id}=req.params;

    const usuario= await Usuario.findByIdAndUpdate(id,{status:false});
    res.json({usuario})
}