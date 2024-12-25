const { selectFields } = require('express-validator/lib/field-selection');
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  captain:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'captain',
  },
  picup:{
    type:String,
    required: true
  },
  dropoff:{
    type:String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'started' , 'completed'],
    default: 'pending'
  },
  duration: {
    type: Number
  },
  distance:{
    type: Number
  },
  paymentID: {
    type: String
  },
  orderID:{
    type: String
  },
  signature: {
    type: String
  },
  otp:{
    type: Number,
    selectFields:false,
    required: true
  }
});

module.exports = mongoose.model('ride', rideSchema);