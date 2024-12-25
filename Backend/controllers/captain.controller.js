const captainModel = require('../models/captain.model');
const captainSchema=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator')
const BlacklistedToken = require('../models/blacklistToken.model');

module.exports.registerCaptain = async(req, res, next) => {
 const errors=validationResult(req);
 if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()});
 }
 const {name,email,password,vehicle}=req.body;
 const isCaptainAlreadyExist=await captainModel.findOne({email});
 if(isCaptainAlreadyExist){
   return res.status(400).json({errors:[{msg:'Captain with this email already exists'}]});
 }
 const hashedPassword=await captainModel.hashPassword(password);

 const captain=await captainService.createCaptain({
  firstname:name.firstname,
  lastname:name.lastname,
  email,
  password:hashedPassword,
  color:vehicle.color,
  plate:vehicle.plate,
  capacity:vehicle.capacity,
  type:vehicle.type
 })
 const token=captain.generateAuthToken();
 res.status(200).json({token, captain});
}

module.exports.loginCaptain=async(req, res, next) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password}=req.body;
  const captain=await captainModel.findOne({email}).select('+password');
  if(!captain || !(await captain.comparePassword(password))){
    return res.status(401).json({message: 'Invalid credentials'});
  }
  const token=captain.generateAuthToken();
  res.cookie('token', token);
 res.status(200).json({token, captain});
}

module.exports.getCaptainProfile=async(req, res, next) => {
  res.status(200).json(req.captain)
}

module.exports.logoutCaptain=async(req,res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await BlacklistedToken.create({token});
  res.status(200).json({message: 'Logged out'})
}