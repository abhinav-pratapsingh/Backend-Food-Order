import foodModel from "../models/foodModels.js";
import restroModel from "../models/restroModel.js";



const serachSugesstions =  async (req,res)=>{
    const query = req.query.q;
    if(!query){
        return res.json({success:true,message:"no query input",data:{}});
    }
    try {
        const regex = new RegExp(query,"i");
        const items = await foodModel.find({name:regex}).limit(5);
        const restaurent = await restroModel.find({name:regex}).limit(5);
        res.json({success:true,data:{items:items,restaurents:restaurent}});
    } catch (error) {
        res.json({success:false,message:"failed to find searches"});
    }
}

export {serachSugesstions};