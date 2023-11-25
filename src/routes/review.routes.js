const express = require("express");
const router = express.Router();
const reviewController = require("../controller/review.controller");
 
const { verifyToken } = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
 
router
    .post("/review",verifyToken, reviewController.postReview)
     .get("/review", reviewController.getReview)
    .delete("/review/:id",authorization("admin"), reviewController.deleteReview)
 
module.exports = router;