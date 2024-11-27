import userModel from "../models/userModel.js"
import restroModel from "../models/restroModel.js"

const fetchRestroPV = async(req,res)=>{
    try{
    const restro = await restroModel.find({status:0}).sort({date:-1});
    res.json({success:true,data:restro})}
    catch(e){
        console.log(e);
        res.json({success:false,message:"error"});
    }
}

const fetchRestroVH = async(req,res)=>{
    try{
        const restro = await restroModel.find({status:1}).sort({date:-1});
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"error"});
    }
}

const fetchRestroB = async (req,res)=>{
    try{
        const restro = await restroModel.find({status:3}).sort({date:-1});
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"error"});
    }
}

const updateRestroStatus = async(req,res)=>{
    try{
        const restro = await restroModel.findByIdAndUpdate(req.body.id,{status:req.body.status});
        res.json({success:true,message:'success'})
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"error"});
    }
}

export {updateRestroStatus,fetchRestroB,fetchRestroPV,fetchRestroVH};