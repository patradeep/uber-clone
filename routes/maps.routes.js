const express=require('express');
const router=express.Router();
const authMiddleWare=require('../middlewares/auth.middlewares');
const mapController=require('../controllers/maps.controller');
const {query}=require('express-validator');

router.get('/get-cordinates',
  query('address').isString().isLength({min:3}),
  authMiddleWare.authUser,mapController.getCoordinates);

router.get('/get-distance-time',
  query('origin').isString().isLength({min:3}),
  query('destination').isString().isLength({min:3}),
  authMiddleWare.authUser,mapController.getDistanceAndTime);

router.get('/get-suggestion',
  query('address').isString().isLength({min:3}),
  authMiddleWare.authUser,mapController.getSuggestion);


  module.exports=router; 