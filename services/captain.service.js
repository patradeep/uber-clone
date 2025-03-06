const captainMode = require('../models/captain.model');

module.exports.createCaptain=async({
  firstname,lastname,email,password,color,plate,capacity,type
})=>{
  if(!firstname || !email || !password || !color || !plate || !capacity || !type){
    throw new Error('All fields are required');
  }
  const captain=captainMode.create({name:{firstname,lastname},email,password,vehicle:{color,capacity,type,plate}})
  return captain;
}
