import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {type :String ,required : true},
    items  : {type:Array,default:[{"name":"kabab","price":40,"quantity":3},{"name":"dhai","price":80,"quantity":7}]},
    amount : {type:Number,required: true},
    address:{type:Object,default:{hello:1}},
    status:{type:String,default:"food processing"},
    date : {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}

});

const orderModel = mongoose.model('orderModel',orderSchema);

export default orderModel ; 