import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("mongo db is connected");
        
    }catch(err){
        console.log(err);
        
    }
}

export default connectDb;