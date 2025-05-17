const userModel = require('../model/user.model');
const userService = require('../services/user.service');
const {validationResult}=require('express-validator');
const blacklistTokenModel = require("../model/blacklistToken.model");


module.exports.registerUser= async (req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});
    }

    const {fullname,email, password,semester,section}=req.body;
  

    const isUserAlreadyExist =await userModel.findOne({email});

   if(isUserAlreadyExist){
       return res.status(400).json({message:'user already exist'})
   }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
       fullname,
       email,
       password:hashedPassword,
       semester,
       section
    })

    const token = user.generateAuthToken();

    res.send(201).json({token,user});
}


module.exports.loginUser= async (req,res,next)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    const {email, password}=req.body;

    const user= await userModel.findOne({email}).select("+password");

    if(!user){
       return res.status(401).json({message:'invalid email or password'})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
       return res.send(401).json({message:'invalid  email or passowrd'})
    }


    

    const token = user.generateAuthToken();

     res.cookie('token',token)

    res.status(201).json({token,user});
}


module.exports.getUserProfile= async (req,res,next)=>{
  res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(400).json({ message: 'No token found' });
    }

    // Clear the cookie
    res.clearCookie('token');

    // Blacklist the token
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
}

