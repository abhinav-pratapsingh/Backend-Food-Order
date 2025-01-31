// import {v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.c_api_key, 
//     api_secret: process.env.c_api_secret
// })

// const cloudFileUpload = async (localfilepath)=>{
//     if(!localfilepath){
//         return 1;
//     }
//     try{
//     const response = await cloudinary.uploader.upload(localfilepath,{
//         resource_type: 'auto'
//     });
//     fs.unlink(localfilepath,()=>{});
//     console.log(response)
//     return response.url;
    
//     }
//     catch(e){
//         fs.unlink(localfilepath,()=>{});
//         return null;
//     }
// }

// export default cloudFileUpload;