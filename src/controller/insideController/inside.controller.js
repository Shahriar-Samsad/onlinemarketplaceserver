 
const mongoose = require("mongoose");
const valid = require("validator");
const insideSchema= mongoose.Schema({
    title:{
        type:String,
        required:[true,"set title1"],  
    },
   
    description:{
        type:String,
        required:[true,"set description"],  
    },
    img:{
        type: [String],
        required:true
    }
}, {
    timestamps: true
});
 
const Inside = new mongoose.model("Inside", insideSchema
);

module.exports.getInside = async(req,res)=>{
   try {
       
       const result = await Inside.find({})
       console.log(result,"blog not find");
       res.status(200).json({
        result
       })
   } catch (error) {
    console.log(error.message);
       res.status(400).json({
           error:error.message
       })
   } 
} 
module.exports.getOneInside = async(req,res)=>{
   try {
        const {id} = req.params;
       const result = await Inside.findById(id)
       console.log(result);
       res.status(200).json({
        result
       })
   } catch (error) {
       res.status(400).json({
           error:error.message
       })
   } 
} 

module.exports.postInside = async(req,res)=>{
   try {
      console.log(req.body,"wherer is bdsf");
    
    
  const images = req.files.map(file => `${process.env.MAIN_PATH}${file.path}`);
 
  const newData = {...req.body,img:images}
   console.log(newData);
      
       const result = await Inside(newData).save()
       console.log(result);
       res.status(200).json({
           message:"succesfully added data",
          result 
       })
   } catch (error) {
    console.log(error.message);
    res.status(400).json({
       error:error.message
    })
   }
} 
 

module.exports.updateInside = async(req,res)=>{
    try {
       
 
       const result = await Inside.updateOne({_id:req.params.id},{$set:req.body})
       return result
        res.status(200).json({
            message:"succesfully added data",
           result
        })
    } catch (error) { 
     console.log(error.message);
     res.status(400).json({
        error:error.message
     })
    }
 } 
 module.exports.dltInside = async(req,res)=>{
    try {
         console.log(req.params.id);
       const result = await Inside.deleteOne({_id:req.params.id})
       
        res.status(200).json({
            message:"succesfully added data",
           result
        })
    } catch (error) {
     res.status(400).json({
        error:error.message
     })
    }
 } 
 
 
  
