import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://thakura6hinav:GxbMb7oWozkvoB4d@tomato.ajkdv.mongodb.net/?retryWrites=true&w=majority&appName=tomato').then(()=>{
        console.log('successfully connected to db')
    }).catch((e)=>{
        console.log('error',e);
    })
}
