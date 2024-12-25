import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SubmitOtp(props) {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();

  const handleOtpConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start_ride`, {
          params: {
        rideId: props.ride._id,
        otp: otp
          },
          headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if(response.status === 200) {
          props.setOtppanal(false);
          navigate('/captain-riding', { state: { ride: props.ride } });
        }
    }
    catch (error) {
      console.error("Error confirming ride:", error);
    }
  };
  return (
    <div className="p-3 flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-center p-2">Conform Ride</h2>
      <div className="flex items-center gap-5 p-1">
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
      <form onSubmit={handleOtpConfirm}>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
          placeholder="Enter OTP"
        />

        <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
          Confirm
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
          }}
          className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SubmitOtp;
