import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/tomato').then(()=>{
        console.log('successfully connected to db')
    }).catch((e)=>{
        console.log('error',e);
    })
}
