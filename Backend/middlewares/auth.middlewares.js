const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const BlacklistedToken = require('../models/blacklistToken.model');
const CaptainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const isblacklisted = await BlacklistedToken.findOne({ token });
  if (isblacklisted) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    
    req.user = user;
       
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized' });
  }
}
module.exports.authCaptains = async(req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Not authorized'});
  }
  const isblacklisted = await BlacklistedToken.findOne({token});
  if (isblacklisted) {
    return res.status(401).json({error: 'Not authorized'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await CaptainModel.findById(decoded._id);
    req.captain = captain;
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized' });
  }
}