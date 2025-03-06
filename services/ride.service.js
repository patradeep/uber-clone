const { log } = require('console');
const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

// Define fare rates per kilometer and per minute for each vehicle type
const fareRates = {
  car: { perKm: 10, perMinute: 2, basePrice: 20 },
  auto: { perKm: 8, perMinute: 1.5, basePrice: 15 },
  moto: { perKm: 5, perMinute: 1, basePrice: 10 }
};

async function gateFare(picup, dropoff) {
  if (!picup || !dropoff) throw new Error('Pickup and dropoff required');

  const { distance, time } = await mapService.getDistanceAndTime(picup, dropoff);

  if (isNaN(distance.value) || isNaN(time.value)) {
    throw new Error('Invalid distance or time returned from map service');
  }

  // Calculate fares for all vehicle types
  const fares = {};
  for (const [vehicleType, rates] of Object.entries(fareRates)) {
    fares[vehicleType] = Math.floor(rates.basePrice +
                         ((distance.value / 1000) * rates.perKm) +
                         ((time.value / 60) * rates.perMinute));
  }
  return fares;
}
module.exports.gateFare = gateFare;

function generateOtp(length = 6) {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += crypto.randomInt(0, 10); // Generates a random integer between 0 and 9
  }
  return otp;
}

module.exports.createRide = async ({ picup, dropoff, vehicleType, userId }) => {
  if (!picup || !dropoff || !vehicleType || !userId) throw new Error('Missing required fields');
  try {
    const fares = await gateFare(picup, dropoff);
    if (!fares[vehicleType]) throw new Error('Invalid vehicle type');
    const fare = fares[vehicleType];
    const otp = generateOtp();
    const ride = await rideModel.create({
      picup,
      dropoff,
      fare,
      userId,
      otp
    });
    return ride;
  } catch (error) {
    console.error('Error creating ride:', error);
    throw error;
  } 
};

module.exports.confirmRide = async (rideId, captain) => {
  if (!rideId || !captain) throw new Error('Ride ID and captain ID required');
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId, status: 'pending' },
      { status: 'confirmed', captain },
      { new: true }
    );
    return ride;
  } catch (error) {
    console.error('Error confirming ride:', error);
    throw error;
  }
};

module.exports.startRide = async ({rideId, otp,captain}) => {
  if (!rideId || !otp) throw new Error('Ride ID and OTP required');
  try {
    const ride = await rideModel.findOne({_id:rideId}).populate('userId').populate('captain').select('+otp');
    if (!ride) throw new Error('Ride not found');
    console.log(ride.otp,otp);
    
    if (ride.otp != otp) throw new Error('Invalid OTP');
    if (ride.status != 'confirmed') throw new Error('Ride not confirmed yet');
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'started' });
    return ride;
  }
  catch (error) {
    console.error('Error starting ride:', error);
    throw error; 
  }
}

module.exports.completeRide = async ({rideId,captain}) => {
  if (!rideId) throw new Error('Ride ID required');
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId, status: 'started', captain : captain._id },
      { status: 'completed' },
      { new: true }
    );
    return ride;
  } catch (error) {
    console.error('Error completing ride:', error);
    throw error;
  }
};