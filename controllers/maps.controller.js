const mapsService=require('../services/maps.service');
const {validationResult}=require('express-validator');

module.exports.getCoordinates=async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { address } = req.query;
    const coordinates = await mapsService.getAddressCordinate(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get coordinates' });
  }
};

module.exports.getDistanceAndTime=async(req, res,next) => {
  try{
    const error=validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({ errors: error.array() });
    }
    const { origin, destination } = req.query;
    const distanceAndTime = await mapsService.getDistanceAndTime(origin, destination);
    res.status(200).json({ distanceAndTime });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server Error' });
  }
};

module.exports.getSuggestion=async(req, res, next) => {
  try{
    const error=validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({ errors: error.array() });
    }
    const { address } = req.query;
    const suggestions = await mapsService.getSuggestion(address);
    res.status(200).json({ suggestions });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server Error' });
  }
};