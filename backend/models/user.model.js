import mongoose from "mongoose";
import { Schema } from "mongoose";

const userScheema=new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    username:{
        type:String,
    }
},{timestamps:true});

const User=mongoose.model("User",userScheema)
export default User

