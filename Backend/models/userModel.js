import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cartData : {type:Object,default:{}},
    status : {type:Number,default:0},
    date : {type:Date,default:Date.now()}
},{minimize:false});

const userModel = mongoose.model.User || mongoose.model('userModel',userSchema);

export default userModel;