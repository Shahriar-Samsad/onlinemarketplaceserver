const SSLCommerzPayment = require('sslcommerz-lts')
const { v4: uuidv4 } = require('uuid');
const Payment = require('../model/payment.model');
 
module.exports.postPayment = async (req, res, next) => {
   console.log(req.body);
    try {
     
        const data = {
          total_amount: req.body.price,
          currency: 'BDT',
          tran_id: 'REF123', // use unique tran_id for each api call
          success_url: 'http://localhost:3000/success',
          fail_url: 'http://localhost:3030/fail',
          cancel_url: 'http://localhost:3030/cancel',
          ipn_url: 'http://localhost:3030/ipn',
          shipping_method: 'Courier',
          product_name: 'Computer.',
          product_category: 'Electronic',
          product_profile: 'general',
          cus_name: req?.body?.name,
          cus_email: 'customer@example.com',
          cus_add1: 'Dhaka',
          cus_add2: 'Dhaka',
          cus_city: 'Dhaka',
          cus_state: 'Dhaka',
          cus_postcode: '1000',
          cus_country: 'Bangladesh',
          cus_phone: req?.body?.phone,
          cus_fax: '01711111111',
          ship_name: 'Customer Name',
          ship_add1: 'Dhaka',
          ship_add2: 'Dhaka',
          ship_city: 'Dhaka',
          ship_state: 'Dhaka',
          ship_postcode: 1000,
          ship_country: 'Bangladesh',
        };
        const result = await Payment(data).save();
 
        const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false)
    
        // sslcz.init(data).then(data => {
        //     // res.status(200).json({
        //     //     result: data.GatewayPageURL
        //     // })
        // });
        sslcz.init(data).then(apiResponse => {  
         
          // Redirect the user to payment gateway
          let GatewayPageURL = apiResponse.GatewayPageURL
          res.status(200).json({
            result:  GatewayPageURL
        })
      });

    }
    catch (error) {
        res.status(200).json({
            error: error.message
        })
    }
}
module.exports.successPayment = async (req, res, next) => {
    try {

        const result = await Payment.updateOne({ tran_id: req.body.tran_id }, { $set: { val_id: req.body.val_id } })
        res.redirect(`http://localhost:3000/success/${req.body.tran_id}`)
    }
    catch (error) {
        res.status(200).json({
            error: error.message
        })
    }
}
module.exports.failPayment = async (req, res, next) => {
    try {

        const tran_id = req.body.tran_id;
        const result = await Payment.deleteOne({ tran_id: tran_id })
        res.redirect(`http://localhost:3000/`)
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports.cancelPayment = async (req, res, next) => {
    try {
        const tran_id = req.body.tran_id;
        const result = await Payment.deleteOne({ tran_id: tran_id })
        res.redirect(`http://localhost:3000/`)
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports.getOrderPayment = async (req, res, next) => {
    try {
        const tran_id = req.params.id;
        const result = await Payment.findOne({ tran_id: tran_id })

        res.status(200).json({
            result
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports.postOrderPayment = async (req, res, next) => {
    try {
        const {tran_id,val_id }= req.body;
        const status = await Payment.findOne({ tran_id: tran_id });
          await Payment.updateOne({ tran_id: tran_id }, { $set: { tran_id: status.val_id,payment:"successfull" } })
          await MediPayment.updateOne({ tran_id: tran_id }, { $set: { tran_id: status.val_id,payment:"successfull" } })
          await Appointment.updateOne({ _id: status?.product_id }, { $set: { paymentStatus:"paid" } })
         
        res.status(200).json({
             result:"successfull"
        })
    }

    catch (error) {
        res.status(200).json({
            error: error.message
        })
    }
}