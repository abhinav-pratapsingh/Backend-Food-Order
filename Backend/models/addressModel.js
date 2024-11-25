import mongoose from "mongoose";

const addressSChema = new mongoose.Schema({
        userId: {type:String,required:true},
        house_flat_no :{type:String},
        landmark: {type:String,required:true},
        locality: {type:String,required:true},
        district:  {type:String,required:true},
        state:  {type:String,required:true},
        pin_code: {type:Number,required:true},
        longi:{type:Number,required:true},
        lati:{type:Number,required:true}
     });


    const addressModel = mongoose.model.addressModel || mongoose.model('addressModel',addressSChema);

    export default addressModel; 