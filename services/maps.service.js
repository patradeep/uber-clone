const axios = require('axios');
const captainModel=require('../models/captain.model');

module.exports.getAddressCordinate = async (address) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url); 
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng
      }; 
    } else if (response.data.status === 'ZERO_RESULTS') {
      console.warn('No results found for the given address.');
      return null; // or handle it in a way that suits your application
    } else {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

module.exports.getDistanceAndTime=async(origin, destination)=>{
  if (!origin || !destination) throw new Error('Origin and destination required');
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const distance = response.data.rows[0].elements[0].distance;
      const time = response.data.rows[0].elements[0].duration;
      return { distance, time };
    } else if (response.data.status === 'ZERO_RESULTS') {
      console.warn('No results found for the given origin and destination.');
      return null; // or handle it in a way that suits your application
    } else {
      throw new Error(`Distance matrix error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error.message);
    throw error;
  }
}

module.exports.getSuggestion=async(address)=>{
  if (!address) throw new Error('Location required');
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      return response.data.predictions;
    } else if (response.data.status === 'ZERO_RESULTS') {
      console.warn('No results found for the given location.');
      return null; // or handle it in a way that suits your application
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error.message);
    throw error;
  }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  try {
    // radius in km
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6371]
        }
      }
    });

    return captains;
  } catch (error) {
    console.error('Error fetching captains in the radius:', error.message);
    throw error;
  }
}