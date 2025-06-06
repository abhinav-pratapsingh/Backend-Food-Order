import mongoose from "mongoose";

const restroSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:Object,required:true},
    email : {type:String,required:true},
    image : {type:String,required:true},
    password:{type:String,required:true},
    phone : {type:Number,required:true},
    date : {type:Date,default:Date.now()},
    status : {type:Number,default:0}//0 for registration pending ,1  for restration on hold,3 for restro active,2 for Account blocked
})

restroSchema.index({name:1});

const restroModel = mongoose.model("restroModel",restroSchema);

export default restroModel; 

    //restro address format
    //     locality: String
    //     district:  String
    //     state: String
    //     pin_code: Number
    //     lati:Number
    //     longi:Number