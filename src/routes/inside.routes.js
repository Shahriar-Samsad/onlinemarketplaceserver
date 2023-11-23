const express = require("express");
const insideController = require("../controller/insideController/inside.controller");
const { verifyToken } = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const upload = require("../middleware/upload");
const router = express.Router();
 
router
    .post("/blog",  upload.array("img") ,  insideController.postInside)
    .get("/blog", insideController.getInside)
    .get("/blog/:id", insideController.getOneInside)
    .delete("/blog/:id",   insideController.dltInside)
    
module.exports = router;