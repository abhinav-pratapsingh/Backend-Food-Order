import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    const cartData = await userData.cartData;
    console.log(req.body.itemId);
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: `success` });
  } catch (error) {
    res.json({ success: false, message: `failed ${error}` });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: `success` });
  } catch (e) {
    res.json({ success: false, message: `error ${e}` });
  }
};

const getCart = async (req, res) => {
  try {
    console.log(req.body.userId);
    const userData = await userModel.findOne({ _id: req.body.userId });
    const cartData = await userData.cartData;
    console.log(cartData);
    res.json(cartData);
  } catch (e) {
    res.json({ success: false, message: `error ${e}` });
  }
};

export { addToCart, removeFromCart, getCart };
