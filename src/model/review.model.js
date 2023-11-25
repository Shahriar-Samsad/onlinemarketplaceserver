const mongoose = require("mongoose");
 
const reviewSchema = mongoose.Schema(
  {
   title: {
      type: String,
       
    },
    rating:{
        type:Number,
        required:true
    },
    details:{
        type:String,
        
    },
    img:{
        type:String
    },
    name:{
        type:String
    }
    
},
  {
    timestamps: true,
  }
);

 
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
