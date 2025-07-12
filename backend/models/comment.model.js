import mongoose, { Schema, SchemaType } from "mongoose";


const commentScheema=new Schema({
    description:{
        type:String,
        required:true,

    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },coinId:{
       type:String,
       required:true, 
    },
   
},{timestamps:true});
export default mongoose.model("Comment",commentScheema);