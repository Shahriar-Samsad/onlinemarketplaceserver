const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const paymentSchema = mongoose.Schema({
    total_amount:Number,
    currency: String,
    tran_id:  String,
    success_url: String,
    fail_url:String,
    cancel_url: String,
    ipn_url: String,
    shipping_method: String,
    product_name: String,
    product_category: String,
    product_profile: String,
    cus_name: String,
    cus_email: String,
    cus_add1: String,
    cus_add2: String,
    cus_city: String,
    cus_state: String,
    cus_postcode: String,
    cus_country:String,
    cus_phone: String,
    cus_fax: String,
    ship_name: String,
    ship_add1: String,
    ship_add2: String,
    ship_city: String,
    ship_state: String,
    ship_postcode: String,
    ship_country:  String,
    multi_card_name:  String,
    value_a: String,
    value_b: String,
    value_c: String,
    value_d: String,
    val_id:String,
    payment:String,
    product_id:ObjectId
},
    {
        timestamps: true
    });
 
const Payment = new mongoose.model("Payment", paymentSchema);
module.exports = Payment;