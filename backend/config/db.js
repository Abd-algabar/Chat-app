import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
             await mongoose.connect(process.env.MONGO_URL).then(()=>{
                console.log("MongoDB Connected: 1")
            })
            mongoose.connection.on("connected",()=>{
                console.log("db connected")
            })
    }catch(error){
            console.log(error);
            // process.exit(1);
    }
}