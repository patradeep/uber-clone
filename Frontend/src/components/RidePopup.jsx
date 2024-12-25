import React from "react";
import { Link,useNavigate } from "react-router-dom";


function RidePopup(props) {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-center p-3">
        New Ride Available!
      </h2>
      <div className="flex items-center bg-yellow-400 p-3 rounded-md justify-between">
        <div className="flex items-center gap-3">
        <img className="w-10 rounded-full h-10" src="https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <h3 className="text-lg font-medium">{props.ride?.userId.name.firstname} {props.ride?.userId.name.lastname}</h3>
        </div>
        <h5 className="text-lg font-semibold">2.2km</h5>
      </div>
      <div className="flex items-center mt-3 gap-5 p-1">
        <i className="text-lg ri-map-pin-2-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-A</h3>
          <p className="text-gray-600">{props.ride?.picup}.</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-1">
        <i className="text-lg ri-map-pin-4-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-B</h3>
          <p className="text-gray-600">{props.ride?.dropoff}.</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-1">
        <i className="ri-money-rupee-circle-fill"></i>
        <div>
          <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
          <p className="text-gray-600">Cash</p>
        </div>
      </div>
      <button
        onClick={() => {
        props.confirmRide();
        props.setOtppanal(true);
        }
        }
        className=" text-center block w-full text-lg font-medium mb-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
      >
        Confirm
      </button>
      <button
        onClick={() => {
        props.setRidePopup(false);
        }}
        className=" text-center w-full text-lg font-medium bg-slate-300 hover:bg-slate-400  p-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  );
}

export default RidePopup;
