const express = require('express');
const router = express.Router();
const {body,query}=require('express-validator')
const rideController=require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/create',
  authMiddleware.authUser,
  body('picup').isString().isLength({min:3}).withMessage('invalid picup address'),
  body('dropoff').isString().isLength({min:3}).withMessage('invalid dropoff address'),
  body('vehicle').isString().isIn(['car', 'auto' , 'moto']).withMessage('invalid vehicle'),
  rideController.createRide
)

router.get('/get_fare',
  authMiddleware.authUser,
  query('picup').isString().isLength({min:3}).withMessage('invalid picup address'),
  query('dropoff').isString().isLength({min:3}).withMessage('invalid dropoff address'),
  rideController.gateFare
) 

router.post('/confirm',authMiddleware.authCaptains,
  body('rideId').isMongoId().withMessage('invalid ride id'),
  rideController.confirmRide);

router.get('/start_ride',
  authMiddleware.authCaptains,
  query('rideId').isMongoId().withMessage('invalid ride id'),
  query('otp').isString().isLength({min:6}).withMessage('invalid otp'),
  rideController.startRide);

router.post('/complete_ride',
  authMiddleware.authCaptains,
  body('rideId').isMongoId().withMessage('invalid ride id'),
  rideController.completeRide);

module.exports =router;