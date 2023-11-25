const { getReviewService, postReviewService, deleteReviewService } = require("../service/review.service")

 
module.exports.getReview = async(req,res)=>{
   try {
        
       const {result } = await getReviewService( )
       res.json({ 
           
           result 
       })
   } catch (error) {
      
       res.status(400).json({
           error:error.message
       })
   }
}
module.exports.postReview = async(req,res)=>{
   try {
 
      console.log(req.user);
       const result = await postReviewService(req.body,req.user.email )
    
       res.json({
           result
       })
   } catch (error) {
       console.log(error.message);
    res.status(400).json({
       error:error.message
    })
   }
}
 
module.exports.deleteReview = async(req,res)=>{
   try {
       const {id} = req.params;
       const result = await deleteReviewService(id)
       res.json({
           result   
           
       })
   } catch (error) {
       
   }
}
 


