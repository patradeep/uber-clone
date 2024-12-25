import React from 'react'

function DriverDetail(props) {
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-center p-3">Driver detail</h2>
      <div className="flex justify-around">
        <img className='h-20' src={props.carType} alt="" />
        <div className='justify-center items-center'>
          <h3 className="text-lg font-medium capitalize">{props.ride?.captain.name.firstname} {props.ride?.captain.name.lastname}</h3>
          <h4 className="text-base font-medium">{props.ride?.captain.vehicle.plate}</h4>
          <h4 className="text-lg font-medium bg-orange-200 text-center p-2 rounded-md">OTP:{props.ride?.otp}</h4>
        </div>
      </div>
      <div className="flex items-center gap-5 p-1">
        <i className="text-lg ri-map-pin-2-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-A</h3>
          <p className="text-gray-600">{props.ride?.dropoff}.</p>
        </div> 
      </div>
      <div className="flex items-center gap-5 p-1">
        <i className="text-lg ri-map-pin-4-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-B</h3>
          <p className="text-gray-600">{props.ride?.picup}.</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-1">
      <i className="ri-money-rupee-circle-fill"></i>
      <div>
          <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
          <p className="text-gray-600">Cash</p>
        </div>
      </div>
    </div>
  )
}

export default DriverDetail