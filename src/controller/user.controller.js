const { signupService,
   findUserByToken, 
   findUserByEmail, 
   userSubscribeService} = require("../service/user.service");
const { sendMailWithGmail } = require("../utils/email");
const { generateToken } = require("../utils/token");

  // const bcrypt = require('bcryptjs');
  // register function 
  module.exports.signup = async (req, res) => {
    try {
      const user = await signupService(req.body);
     
      await user.save({validateBeforeSave:false});
      const token = generateToken(user);
      res.status(200).json({  
        status: "succesfful",
        message: "Check Email To Active Account",
        token:token
      });
    }
    catch (error) {
      res.status(401).json({
       error: error.message
      })
    } 
  } 
  // login function 
  module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
   
    console.log(email);
   
      const user = await findUserByEmail(email);
  
      console.log(user);
      const isPasswordValid = user.comparePassword(password, user.password);
      console.log(isPasswordValid);
    
      const token = generateToken(user);
           console.log(token);
      res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        token : token,
      
      });
    } catch (error) {
    
      res.status(401).json({
        status: "fail",
        error:error.message
      });
    }
  };
  // profile get 
  module.exports.getMe= async (req, res) => {
    try {
      
      const user = await findUserByEmail(req.user?.email);
      const {password:pwd,...other} = user.toObject();

      const modifiedWishlist = other.wishlist.map(item => {
        const { like, ...rest } = item;
        return rest;
      });
      
      // Create a new object with the modified wishlist
      const others= { ...other, wishlist: modifiedWishlist };
    
      res.status(200).json({
        status: "succesfful",
        message: "get user all data",
        data: others
      });
    }
    catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  }

  module.exports.confirmationAccount = async (req,res)=>{
        try{
           const {token} = req.params;
        
           const user =await findUserByToken(token);
 
           if(!user){
            return res.status(403).json({
              status:"fail getting user",
               error:"invalid user"
            })
           }
        
           const expired = new Date()>new Date(user.confirmationTokenExpires);
          if(expired){
            return res.status(403).json({
              status:"fail",
               error:"token expired"
            })
          }
          user.status = "active",
          user.confirmationToken = undefined,
          user.confirmationTokenExpires=undefined,
           user.save({validateBeforeSave:false});
          res.redirect(process.env.WEB_PATH);
          }
        catch(error){
          res.status(500).json({
            status:"fail",
            error
          })
        }
  } 

  module.exports.userSubscribe= async(req,res)=>{
    try {
        const {isSubscribe,email} = await findUserByEmail(req.user?.email);
        
        if(email!==req.body.email){
          return res.status(501).json({
          error:"email mismatch"
          })
        }
      else  if(isSubscribe){
          return res.status(501).json({
          error:"this email already use"
          })
        }
        const result = await userSubscribeService(req.body.email,req.user.email)
        res.status(200).json({
              message:'successfully subscribe',
              result
        })
    } catch (error) {
      error: error.message
    }
}
 
