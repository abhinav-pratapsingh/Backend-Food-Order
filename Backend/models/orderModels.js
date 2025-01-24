import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    restroId :{type:String , required:true},
    userId : {type :String ,required : true},
    items  : {type:Array,reuired:true },
    amount : {type:Number,required: true},
    address:{type:Object,default:{hello:1}},
    status:{type:String,default:"food processing"},
    date : {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}

});

const orderModel = mongoose.model('orderModel',orderSchema);

export default orderModel ; 