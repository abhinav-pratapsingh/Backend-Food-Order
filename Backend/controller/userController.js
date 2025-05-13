import nodemailer from "nodemailer";
const sub = "verification email tomato";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpModel from "../models/otpModel.js";
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "healthtravelalliance@gmail.com",
    pass: "emxy xbzs dflp louy",
  },
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const sendMailVerification = async (to, sub, code) => {
  await transporter.sendMail({
    to: to,
    subject: sub,
    html: `verification code is ${code}`,
  });
};

const userRegister = async (req, res) => {
  const { name, email, password, otp } = req.body;
  console.log(name, email, password, otp);
  try {
    const D_otp = await otpModel.find({ email }).sort({ Date: -1 });
    console.log(D_otp[0].otp);
    const isVaild = (D_otp) => {
      const current = Date.now();
      const tenmin = 10 * 60 * 1000;
      const otpDate = D_otp[0].Date;
      return tenmin >= current - otpDate;
    };
    if (otp == D_otp[0].otp && isVaild(D_otp)) {
      await otpModel.deleteMany({ email });
      //checking user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, message: "user already exists" });
      }
      //validating email format & string pass
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "please enter a strong password",
        });
      }
      //hashing user pass
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedpassword,
      });

      const user = await newUser.save();
      const token = createToken(user._id);
      res.json({
        success: true,
        message: "User successfully registered",
        token,
      });
    } else {
      res.json({ success: false, message: "otp is incorrect or expired" });
    }
  } catch (e) {
    res.json({ success: false, message: `error ${e}` });
  }
};

const sendCode = async (req, res) => {
  const code = Math.floor(Math.random() * 100000) + 100000;
  console.log(code);

  const email = req.body.email;
  console.log(email);
  if (!email) {
    return res.json({ success: false, message: "please enter email" });
  }
  try {
    const otp = new otpModel({ email: email, otp: code, Date: new Date() });
    sendMailVerification(email, sub, code);
    await otp.save();
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (e) {
    res.send(e);
    //res.json({success:false,message:'cannot send verification code'})
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not exists please register",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.json({ success: false, message: "invaild credentials" });
      }

      const token = createToken(user._id);
      res.json({ success: true, message: "user logged in successflly", token });
    }
  } catch (e) {
    res.json({ success: false, message: `login failed}` });
  }
};

export { userRegister, userLogin, sendCode };
