import foodModel from "../models/foodModels.js";
import userModel from "../models/userModel.js";
import restroModel from "../models/restroModel.js"

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    const itemId = Object.keys(cartData).at[-1];
    const isSameRestro = async (restroId, itemId)=>{
    if(!itemId){
      return true;
    }
    else{
      const restro = await foodModel.findById(itemId);
      if(restro.restroId==restroId){ //check previous item id 
      
        return true;

      }
      else return false;
    }
    }
    console.log(req.body.itemId);
    console.log(req.body.restroId);
    console.log( await isSameRestro(req.body.restroId,itemId));
    if(await isSameRestro(req.body.restroId,req.body.itemId)){
      if (!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1;
      } else {
      cartData[req.body.itemId] += 1;
      }
   
       await userModel.findByIdAndUpdate(req.body.userId, { cartData });
       console.log(cartData);
       res.json({ success: true, message: `success` });
    }
  else{
    cartData = {};
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json ({success:true , message:"cart reset with new restaurent"})
  }
    
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
    if(!cartData){
      return res.json({success:true,message:"cart is empty"});
    }
    const item_data =await Promise.all( Object.keys(cartData).map(async (v)=>{
     const item = await foodModel.findById(v);
      return {
        ...item.toObject(),
        quantity : cartData[v]
      }
    }))
    console.log(item_data);
    res.json({success:true , data : item_data});
  } catch (e) {
    res.json({ success: false, message: `error ${e}` });
  }
};

export { addToCart, removeFromCart, getCart };
