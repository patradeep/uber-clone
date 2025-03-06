const userModel=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator')
const authMiddleware=require('../middlewares/auth.middlewares');
const BlacklistedToken = require('../models/blacklistToken.model');

module.exports.registerUser = async(req, res, next) => {
const errors=validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()});
}
const {name,email,password}=req.body;
const isUserAlreadyExist=await userModel.findOne({email});
if (isUserAlreadyExist) {
  return res.status(409).json({message: 'User already exist'});
}
const hashPassword=await userModel.hashPassword(password);
const user=await userService.createUser({
  firstname:name.firstname,
  lastname:name.lastname,
  email,
  password:hashPassword
});
const token=user.generateAuthToken();
res.status(201).json({token, user});
};

module.exports.loginUser = async(req, res, next) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password}=req.body;
  const user=await userModel.findOne({email}).select('+password');
  if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({message: 'Invalid credentials'});
  }
  const token=user.generateAuthToken();
  res.cookie('token', token);
  res.status(201).json({token, user});
};

module.exports.getUserProfile=async (req, res, next) => {
  res.status(201).json(req.user)
};
module.exports.logoutUser=async (req,res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await BlacklistedToken.create({token});
  res.status(201).json({message: 'Logged out'})
};