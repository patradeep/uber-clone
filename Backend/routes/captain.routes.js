const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middlewares');

const captainController= require('../controllers/captain.controller');

router.post('/register',[
  body('name.firstname').isLength({min: 3}).withMessage('Firstname must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters'),
  body('vehicle.plate').isLength({min:6}).withMessage('plate must be at least 6 characters long'),
  body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
  body('vehicle.type').isIn(['car','motorcycle','auto'])
],
captainController.registerCaptain);

router.post('/login',[
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
  captainController.loginCaptain);
  
router.get('/profile',authMiddleware.authCaptains,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptains,captainController.logoutCaptain);

module.exports =router;
