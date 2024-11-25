import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';

const  instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })


const placeOrder = async(req,res)=>{

    console.log(process.env.key_id,process.env.key_secret);
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const u = req.body.items;

        const options = {
            amount: req.body.amount*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          instance.orders.create(options,function(err, order) {
            console.log(order);
            res.json({})
            if(err){
                console.log("eroorrrrr",err);
            }
          });

        res.json({success:true,data:order});

    } catch (e) {
        res.json({success:false,message:`failed ${e}`});
    }


        // code for stripe payment gateway;
        // const line_items = u.map((item)=>({
           
        //     price_data:{
        //         currency:"inr",
        //         product_data : {name:item.name},
        //         unit_amount:  item.price*100,
        //         quantity:    item.quantity
        //     }}));

        // line_items.push({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{name:"delivery charges"},
        //         unit_amount:2*100
        //     },
        //     quantity:1
        // });

       

};

const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(e)
        res.json({success:false,msg:"cannot fetch orders"});
}

};

const listOrders = async(req,res)=>{

    try{
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
    }catch(e){
        res.json({success:false,message:"cannot fecth orders"})
    }

};

const updateOrderStatus = async (req,res)=>{
    const order = await orderModel.findOne({_id:req.body.orderId});
    order.status = req.body.orderStatus;
    res.json({success:true,message:'successfull',data:order});
};





export {placeOrder,userOrders,updateOrderStatus,listOrders};