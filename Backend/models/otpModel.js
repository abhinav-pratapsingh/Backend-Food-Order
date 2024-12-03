import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: String,
    otp : Number,
    Date:{type:Date,default:Date.now()}

});

const otpModel = mongoose.model('otpModel',otpSchema);
export default otpModel;