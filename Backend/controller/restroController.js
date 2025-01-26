import bcrypt from 'bcrypt';
import restroModel from '../models/restroModel.js';
import jwt from "jsonwebtoken";

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const restroRegister = async(req,res)=>{
    try{
    let image = `${req.file.filename}`    
    const {email,password,phone,name,locality,district,state,pin_code,lati,longi} = req.body;
    const exists = await restroModel.findOne({email:email});
    if(exists){
       return res.json({success:false,message:"restaurent already exists"});
    }
    else if(password.lenth<8){
        return res.json({success:false,message:"password is too weak"});
    }
    else{

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt)

    const obj = {locality: locality,
        district:  district,
        state: state,
        pin_code:pin_code,
        lati:lati,
        longi:longi}

    const restro = new restroModel({
    name:name,
    address : obj,
    image : image,
    email :email,
    password:hashedpassword,
    phone : phone,
    })


    await restro.save();
    res.json({success:true,message:'application submitted successfully'});
 }

}
catch(e){
    console.log(e);
    res.json({success:false,message:"error"})
}
}

const restroLogin = async(req,res)=>{
    try{
    const {password,email} = req.body;
    const restro = await restroModel.findOne({email:email})
    const compare = bcrypt.compare(password,restro.password);
    if(compare){
        const token = createToken(restro._id);
        res.json({success:true,message:"login successfull",token});
    }else{
        res.json({success:false,message:"invaild credentials"});
    }
    }catch(e){
        console.log(e)
        res.json({success:false,message:"Login failed"});
    }
}

export {restroRegister,restroLogin};