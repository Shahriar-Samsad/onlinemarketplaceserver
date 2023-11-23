module.exports=(...role)=>{
    return (req,res,next)=>{
     const userRole = req.user.role;
     if(!role.includes(userRole)){
        return res.status(403).json({
             status: "authentiacation failed",
             message: "you are not allow to enter data",
             error:"you are not admin" 
           })
     }
     next()
    }
 }