const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const valid = require("validator");
const ProductSchema= mongoose.Schema({
    name: String,
  img: [String],
  price: Number,
  available_time: String,
  availability: String,
  brix: Number,
  labtested: String,
  content: String,
  labUrl:String
    
  
}, {
    timestamps: true
});
ProductSchema.pre('save',function(next){
    console.log(this.price);
    this.offerPrice = this.price
    next()
})
// ProductSchema
// .pre('save',(next)=>{
//     if(this.quantity==0){
//         this.status="out-of-stock"
//     }
//     next()
// })
const Product = new mongoose.model("Product", ProductSchema
);
module.exports = Product; 