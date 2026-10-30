const axios = require('axios');
const captainModel=require('../models/captain.model');

module.exports.getAddressCordinate = async (address) => {
  console.log("Fetching coordinates for address:", address);
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`;

  try {
    const response = await axios.get(url);
      const location = response.data.features[0].geometry.coordinates;
      console.log("Coordinates fetched:", location);
      return {
        latitude: location[1], 
        longitude: location[0]
      };
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};



module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination required");
  }

  try {
    const originCoords = await this.getAddressCordinate(origin);
    const destinationCoords = await this.getAddressCordinate(destination);

    if (!originCoords || !destinationCoords) {
      throw new Error("Could not fetch coordinates for origin or destination");
    }

    const ori = { lat: originCoords.latitude, lng: originCoords.longitude };
    const dest = { lat: destinationCoords.latitude, lng: destinationCoords.longitude };
    const url = `https://router.project-osrm.org/route/v1/driving/${ori.lng},${ori.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`;

    const response = await axios.get(url);

    if (response.data.code !== "Ok") {
      throw new Error("No route found between locations");
    }

    const route = response.data.routes[0];

    const distance = route.distance;
    const time = route.duration;

    return {
      distance,
      time
    };

  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
};


module.exports.getSuggestion=async(address)=>{
  if (!address) throw new Error('Location required');
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=5`;
  try {
    const response = await axios.get(url);
    return response.data.features || [];
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