import React,{useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/socketContext';
import LiveTracking from '../components/LiveTracking';


function RidingToDastination() {
  const location = useLocation();
  const { ride } = location.state || {};
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  socket.on('ride-completed', (ride) => {
    console.log('Ride completed');
    navigate('/home');
  });

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
        </div>
      )}
    </div>
  );
}

export default RidingToDastination;