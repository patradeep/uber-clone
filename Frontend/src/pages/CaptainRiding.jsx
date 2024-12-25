import React from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

function CaptainRiding() {
  const location = useLocation();
  const { ride } = location.state || {};
  const navigate = useNavigate();

  const handleFinishRide =async () => {
    // Logic to finish the ride
    console.log('Ride finished');
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/complete_ride`, {
      rideId: ride._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    try {
      if(response.status === 200) {
        console.log('Ride completed');
        navigate('/captain-home');
        // Redirect to the captain home page
      }
    } catch (error) {
      console.error('Error completing ride:', error);
    }
  };

  return (
    <div className="h-screen relative">
      <LiveTracking/>
      {ride && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Ride Details</h2>
          <p className="mb-1"><strong>Pickup:</strong> {ride.picup}</p>
          <p className="mb-1"><strong>Dropoff:</strong> {ride.dropoff}</p>
          <p className="mb-1"><strong>Fare:</strong> {ride.fare}</p>
          <p className="mb-1"><strong>Status:</strong> {ride.status}</p>
          <div className='w-full flex justify-center'>
          <button
            onClick={handleFinishRide}
            className="mt-4 bg-blue-500 font-bold w-1/2 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Finish Ride
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaptainRiding;