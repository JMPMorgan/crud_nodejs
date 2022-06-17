import pkg from "mongoose";
const {Schema,model}=pkg;
 const UserSchema = Schema({
    name:{
        type:String,
        required:[true,'Need a Name']
    },
    mail:{
        type:String,
        required:[true,'Need a mail'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Need`s Password']
    },
    image:{
        type:String,
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

UserSchema.methods.toJSON=function(){
    //Al momento de imprimir el usuario llama a esta funcion para extrar lo que no queramos
    const {password,__v,_id,...user}= this.toObject();
    user.uid=_id;
    return user;
}
export default model('User',UserSchema);
