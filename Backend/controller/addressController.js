import addressModel from "../models/addressModel.js";
import userModel from "../models/userModel.js";


//for fecthing addresses
const getAddress = async (req,res)=>{
    const userId = req.body.userId;
    try{
    const addresses = await addressModel.find({userId:userId});
    res.json({success:true,data:addresses});
    }catch(e){
        res.json({success:false,message:"failed try again"});
    }
}

//address adding 
const addAddress = async (req,res)=>{

try{
    const address = {
  userId : req.body.userId,
  house_flat_no: req.body.house_flat_no,
  landmark: req.body.landmark,
  locality: req.body.locality,
  district: req.body.district,
  state: req.body.state,
  pin_code: req.body.pin_code,
  longi : req.body.longi,
  lati : req.body.lati
  }
  console.log(address)
   const add = new addressModel(address);
   await add.save();
   res.json({success:true,message:"address added"});

}catch(e){
    console.log(e)
    res.json({success:false,message:"failed try again"});
}
}
//from deleting addresss

const removeAddress =async (req,res)=>{
    try{
 await addressModel.findByIdAndDelete(req.body.addressId);
 res.json({success:true,message:"address deleted"});
    }catch(e){
        res.json({success:false,message:"failed try again"}); 
    }
}
//for requsting one address ony
const reqAddress = async(req,res)=>{
    try {
        const address = await addressModel.findOne({_id:req.body.addressId})
        res.json({success:true,data:address});
    } catch (e) {
        res.json({success:false,message:`failed try again ${e}`});
    }
}

//for updating address
const updateAddress = async (req,res)=>{
    const UpdatedAddress = {
        userId : req.body.userId,
        house_flat_no: req.body.house_flat_no,
        landmark: req.body.landmark,
        locality: req.body.locality,
        district: req.body.district,
        state: req.body.state,
         pin_code: req.body.pin_code
    }
    await addressModel.findByIdAndUpdate({_id:req.body.addressId});
    res.json({success:true,message:"updated successfully"})
}

export {addAddress,removeAddress,updateAddress,getAddress,reqAddress};