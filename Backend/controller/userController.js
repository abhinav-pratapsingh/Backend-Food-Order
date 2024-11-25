import nodemailer from "nodemailer";
const sub = 'verification email tomato';
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const transporter = nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user : 'healthtravelalliance@gmail.com',
            pass : 'emxy xbzs dflp louy'
        }

    }
)

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const sendMailVerification =async (to,sub,code)=>{
  await  transporter.sendMail(
        {
            to : to,
            subject :sub ,
            html : `verification code is ${code}`
        }
    )
}

const userRegister = async (req,res)=>{

    const {name,email,password} = req.body;
    console.log(name,email,password);
    try{
        //checking user already exists
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success:false,message:'user already exists'});
        }
        //validating email format & string pass
        if(password.length<8){
            return res.json({success:false,message:"please enter a strong password"});
        }
        //hashing user pass
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedpassword
        });   
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,message:"User successfully registered",token});

    }catch(e){
        res.json({success:false,message:`error ${e}`});
    }

}

const sendCode = (req,res)=>{

    const code = Math.floor(Math.random()*100000)+100000;
    const email = req.body.email;
    temp = {code,email};
    try{
    sendMailVerification(email, sub, code);
    console.log("code sent");
    res.end();
    }catch(e){
        res.send(e);
        //res.json({success:false,message:'cannot send verification code'})
    }
}



const userLogin =async (req,res)=>{
   const {email,password} = req.body;
   try {
    const user = await userModel.findOne({email:email});
    if(!user){
        return res.json({success:false,message:"user not exists please register"});
    }
    else{
        const isMatch = await bcrypt.compare(password,user.password);
        console.log(isMatch);
        if(!isMatch){
           return res.json({success:false,message:'invaild credentials'});
        }

        const token = createToken(user._id);
        res.json({success:true,message:'user logged in successflly',token})
    }
   } catch (e) {
    res.json({success:false,message:`login failed}`})
   }
}


export {userRegister,userLogin,sendCode};