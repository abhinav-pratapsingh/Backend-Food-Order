import jwt from "jsonwebtoken";
import restroModel from "../models/restroModel.js";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Please login first" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};

const authMiddlewareRestro = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  try {
    if (!token) {
      return res.json({ success: false, message: "Please login first" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.restroId = token_decode.id;
    next();
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};

const checkRestroStatus = async (req, res, next) => {
  console.log(req.body.email);
  try {
    const restro = await restroModel.findOne({ email: req.body.email });
    if (!restro) {
      res.json({ success: false, message: "user not exists" });
    } else {
      if (restro.status == 0) {
        res.json({
          success: false,
          message: "Restaurant registration pending",
        });
      } else if (restro.status == 1) {
        res.json({
          success: false,
          message: "Restaurant registration is on Hold",
        });
      } else if (restro.status == 2) {
        res.json({ success: false, message: "Restaurant account is blocked" });
      } else if (restro.status == 3) {
        next();
      }
    }
  } catch (error){
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const checkUserStatus = async (req, res, next) => {
  try {
    console.log(req.body.email);
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.json({ success: false, message: "user not exists" });
    } else {
      if (user.status == 0) {
        next();
      } else if (user.status == 1) {
        res.json({ success: false, message: "account blocked" });
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};

export {
  authMiddleware,
  authMiddlewareRestro,
  checkRestroStatus,
  checkUserStatus,
};
