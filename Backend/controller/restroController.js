import bcrypt from "bcrypt";
import restroModel from "../models/restroModel.js";
import jwt from "jsonwebtoken";
import otpModel from "../models/otpModel.js";
import fs from "fs";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const restroRegister = async (req, res) => {
  try {
    let image = `${req.file.filename}`;
    const {
      email,
      password,
      phone,
      name,
      locality,
      district,
      state,
      pin_code,
      lati,
      longi,
      otp,
    } = req.body;
    

    const v_otp = await otpModel.find({ email }).sort({ 'Date' : -1 });

    const isVaild = (v_otp) => {
      const current = Date.now();
      const tenmin = 10 * 60 * 1000;
      const otpDate = v_otp[0].Date;
      return tenmin >= current - otpDate;
    };

    if (otp == v_otp[0].otp && isVaild(v_otp)) {
      await otpModel.deleteMany({ email });
      const exists = await restroModel.findOne({ email: email });
      if (exists) {
        return res.json({
          success: false,
          message: "restaurant already exists",
        });
      } else if (password.length < 8) {
        return res.json({ success: false, message: "password is too weak" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const obj = {
          locality: locality,
          district: district,
          state: state,
          pin_code: pin_code,
          lati: lati,
          longi: longi,
        };

        const restro = new restroModel({
          name: name,
          address: obj,
          image: image,
          email: email,
          password: hashedpassword,
          phone: phone,
        });

        await restro.save();
        res.json({
          success: true,
          message: "application submitted successfully",
        });
      }
    } else {
      fs.unlink(`restro_uploads/${image}`, () => {});
      res.json({ success: false, message: "otp is incorrect or expired" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};

const restroLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const restro = await restroModel.findOne({ email: email});
    const compare = await bcrypt.compare(password, restro.password);
    if (compare) {
      const token = createToken(restro._id);
      res.json({ success: true, message: "login successful", token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Login failed" });
  }
};

const districtRestro = async(req,res)=>{
  if (!req.body.district){
    return res.json({success:false,message:"No district is provided"});
  }
  try{
  const district = req.body.district.trim();
  console.log(district)
  const data = await restroModel.find({'address.district':district,status:3})
  console.log(data)
  if(data.length===0){
    return res.json({success:true,message:"no restaurent found in given district"});
  }
  res.json({success:true,message:"found..",data});
  }catch(e){
    res.json({success:false,message:"cannot find restaurents"});
  }
}

export { restroRegister, restroLogin,districtRestro };
