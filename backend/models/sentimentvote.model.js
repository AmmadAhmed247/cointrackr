import mongoose from "mongoose"

import { Schema } from "mongoose"


const sentimentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    coinId:{
       type:String,
       required:true, 
    },
    sentiments:{
        type:String,
        enum:["bullish","bearish"],
        required:true,
    },
},{timestamps:true})
sentimentSchema.index({ coinId: 1, user: 1 }, { unique: true });
export default mongoose.model("SentimentVote",sentimentSchema)