const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact.controller");
 
router
    .post("/contact",  contactController.postContact)
    .get("/vegan", contactController.getContact)
    .post("/contact/:id",  contactController.postContactResponse)
   
module.exports = router;