import passport from "passport";
import nodemailer from "nodemailer";
const sub = 'verification email tomato';
let temp = {email:null,code:null};
import User from "../models/userModel.js";

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

    const {name,email,password,verifyCode} = req.body;
    console.log(name,email,password,verifyCode);
    console.log(temp.email,temp.code)
    try{
        
    if(verifyCode == temp.code && email == temp.email){
        const user = new User({username:email,name:name,cartData:{}});
        const user2 = await User.register(user,password);
        res.json({success:true,data:user});
    }
    else{
        res.json({success:false,message:'verification code did not matched'});
    }
    }catch(e){
        res.json({success:false,message:`cannot register user ${e}`});
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



const userLogin =(req,res)=>{
   res.json({success:true,message:'succussfully logged in'});
}


export {userRegister,userLogin,sendCode};