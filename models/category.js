import pkg from "mongoose";
const {Schema,model}=pkg;
 const CategorySchema= Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        unique:true
    },
    status:{
        type:Boolean,
        default:true,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

export default model('Category',CategorySchema);