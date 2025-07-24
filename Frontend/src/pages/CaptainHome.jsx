import React, { useRef, useState, useContext, useEffect } from 'react';
import { CaptainDataContext } from '../context/CaptionContext';
import RidePopup from '../components/RidePopup';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SocketContext } from '../context/socketContext';
import axios from 'axios';
import SubmitOtp from '../components/SubmitOtp';
import LiveTracking from '../components/LiveTracking';

function CaptainHome() {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [ridePopup, setRidePopup] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const [otppanal, setOtppanal] = useState(false)
  const otpRef=useRef(null)
  useEffect(()=>{
      if(captain){
        socket.emit('join',{userType: 'captain', userId:captain._id});
        const updateLocation = () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(position => {

                  socket.emit('update-location-captain', {
                      userId: captain._id,
                      location: {
                          ltd: position.coords.latitude,
                          lng: position.coords.longitude
                      }
                  })
              })
          }
      }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()
      }
    },[captain])

    socket.on('new-ride', (data) => {
      setRide(data);
      setRidePopup(true);
    })

    async function confirmRide() {
      
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

  } catch (error) {
    console.error('Error confirming ride:', error);
  }
}


  useEffect(() => {
    if (ridePopup) {
      gsap.to(ridePopupRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(ridePopupRef.current, { transform: "translateY(100%)" });
    }
  }, [ridePopup]);

  useGSAP(() => {
    if (otppanal) {
      gsap.to(otpRef.current, { transform: "translatey(0)" });
    } else {
      gsap.to(otpRef.current, { transform: "translatey(100%)" ,visibility: "hidden" });
    }
  }, [otppanal]);

  return (
    <div>
      <div className="h-screen overflow-hidden">
        <div className="h-[67%]">
          <LiveTracking/>
        </div>

        <div className="h-[33%] bg-slate-100 p-4">
          <div className='flex items-center justify-between p-3'>
            <div className="justify-center flex items-start gap-3">
              <img className='w-12 object-cover rounded-full' src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f//medium.webp" alt="" />
              <div>
                <h3 className="text-lg font-medium">
                  {captain?.name.firstname + ' ' + captain?.name.lastname || 'Loading...'}
                </h3>
                <h4 className="text-base font-medium">{captain?.vehicle.plate || 'Loading...'}</h4>
              </div>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>---</h4>
              <p className='text-sm text-gray-500'>Earned</p>
            </div>
          </div>
          <div className='flex justify-between items-start bg-yellow-300 rounded-lg p-6'>
            <div className='text-center'>
              <i className="text-2xl font-thin ri-timer-line"></i>
              <h5 className='text-lg font-medium'>---</h5>
              <p className='text-xs text-gray-700'>Hours</p>
            </div>
            <div className='text-center'>
              <i className="text-2xl font-thin ri-pin-distance-fill"></i>
              <h5 className='text-lg font-medium'>---</h5>
              <p className='text-xs text-gray-700'>KM</p>
            </div>
            <div className='text-center'>
              <i className="text-2xl font-thin ri-sticky-note-add-line"></i>
              <h5 className='text-lg font-medium'>--</h5>
              <p className='text-xs text-gray-700'>Tasks</p>
            </div>
          </div>
        </div>
        <div
          ref={ridePopupRef}
          className="fixed bottom-0 w-full translate-y-full bg-white px-2 py-4"
        >
          <RidePopup 
          ride={ride}
          setOtppanal={setOtppanal}
          confirmRide={confirmRide}
          setRidePopup={setRidePopup} />
        </div>
        <div
        ref={otpRef}
        className="fixed bottom-0 w-full translate-y-full bg-white px-2 py-4 "
      >
        <SubmitOtp ride={ride} setOtppanal={setOtppanal}
        />
      </div>
      </div>
    </div>
  );
}

export default CaptainHome;
