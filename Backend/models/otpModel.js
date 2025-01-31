import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: String,
    otp : Number,
    Date: Date

});

otpSchema.index({ Date: 1 }, { expireAfterSeconds: 600 });

const otpModel = mongoose.model('otpModel',otpSchema);
export default otpModel;