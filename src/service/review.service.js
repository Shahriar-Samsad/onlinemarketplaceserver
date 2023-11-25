
const Review = require("../model/review.model");
const User = require("../model/user.model");
 
module.exports.getReviewService = async ( )=>{
       const result = await Review.find({}) 
       return{
        result,
       }
}
module.exports.postReviewService = async (data , email )=>{
    const user = await User.findOne({email:email})
    console.log(user);
    return await Review.create({...data,name:user?.name,img:user?.img})
}
 
module.exports.deleteReviewService = async (id)=>{
  
  const result = await Review.deleteOne({_id:id})
  
 return result
}
 