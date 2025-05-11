import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    restroId :{type:String , required:true},
    userId : {type :String ,required : true},
    items  : {type:Array,required:true },
    amount : {type:Number,required: true},
    address:{type:Object,default:{hello:1}},
    status:{type:Number,default:0}, // 0 -> order failed // 1 -> processing // 2 -> out for delivery // 3 -> delivered
    date : {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    razorpay_id: {type:String,default:null}

});

const orderModel = mongoose.model('orderModel',orderSchema);

export default orderModel ; 