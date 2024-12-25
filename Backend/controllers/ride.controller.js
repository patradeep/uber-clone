const { validationResult } = require('express-validator');
const rideService=require('../services/ride.service');
const mapsService=require('../services/maps.service');
const {sendMessageToSocketId}=require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async(req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });  
  } 

  const {picup,dropoff,vehicle}=req.body;
  
  try {
    const ride = await rideService.createRide({userId:req.user._id, picup, dropoff, vehicleType:vehicle});
    res.status(201).json(ride);
    const picupLocation = await mapsService.getAddressCordinate(picup);
    const captainInRange=await mapsService.getCaptainsInTheRadius(picupLocation.latitude,picupLocation.longitude,20);
    const populatedUser=await rideModel.findOne({_id:ride._id}).populate('userId');
    populatedUser.otp=null;
    captainInRange.map(captain=>{
      sendMessageToSocketId(captain.socketId,{event:'new-ride',data:populatedUser});
    });
    
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Failed to create ride' });
  }
};

module.exports.gateFare=async(req, res)=>{
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({ errors: error.array() });
  }
  const {picup,dropoff}=req.query;
  try{
    const fare=await rideService.gateFare(picup,dropoff);
    res.status(200).json( fare );
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate fare' });
  }
}

module.exports.confirmRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);
    const populatedRide = await rideModel.findOne({ _id: ride._id })
      .populate('userId')
      .populate('captain').select('+otp'); // Ensure captain is populated
    

    if (!populatedRide.userId || !populatedRide.userId.socketId) {
      return res.status(400).json({ error: 'User socketId not found' });
    }


    sendMessageToSocketId(populatedRide.userId.socketId, { event: 'ride-confirmed', data: populatedRide });
    res.status(200).json(populatedRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to confirm ride' });
  }
};

module.exports.startRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({rideId, otp,captain: req.captain._id});
    const populatedRide = await rideModel.findOne({ _id: ride._id })
      .populate('userId')
      .populate('captain') // Ensure captain is populated
    sendMessageToSocketId(populatedRide.userId.socketId, { event: 'ride-started', data: ride });
    res.status(200).json(ride);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to start ride' });
  }
};

module.exports.completeRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideService.completeRide({rideId,captain: req.captain._id});
    const populatedRide = await rideModel.findOne({ _id: rideId })
      .populate('userId')
      .populate('captain') // Ensure captain is populated
    if (!populatedRide.userId || !populatedRide.userId.socketId) {
      return res.status(400).json({ error: 'User socketId not found' }) ;
    }
    
    sendMessageToSocketId(populatedRide.userId.socketId, { event: 'ride-completed', data: ride });
    res.status(200).json(ride);
  }
  catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Failed to complete ride' });
  }
};