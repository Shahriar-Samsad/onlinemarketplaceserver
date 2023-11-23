const express = require("express");
 const paymentController = require("../controller/payment.controller")
const router = express.Router();
//  brand get and update data 
router
  .route("/init")
  .post(paymentController.postPayment)
   
  router
  .route("/success")
  .post(paymentController.successPayment)
  router
  .route("/fail")
  .post(paymentController.failPayment)
  router
  .route("/cancel")
  .post(paymentController.cancelPayment)
  router
  .route("/order")
   .post(paymentController.postOrderPayment)
  router
  .route("/order/:id")
  .get(paymentController.getOrderPayment)
  
module.exports = router;