import mongoose from "mongoose"

export const dbConnect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN,{
            useUnifiedTopology:true
        });
        console.log('DB Connect');
    } catch (error) {
        throw new Error(`DB Error:${error}`);
    }
}