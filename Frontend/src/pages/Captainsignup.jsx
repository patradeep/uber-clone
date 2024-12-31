import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptionContext";
import axios from "axios";

const Captainsignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate(); 

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      name: { firstname, lastname },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem('token', response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="m-2 flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-3 w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Create Your Caption Account
        </h1>
        <form onSubmit={SubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={firstname}
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-gray-200 rounded-lg w-full sm:w-1/2 text-lg py-2 px-4 placeholder-gray-500"
                type="text"
                name="firstname"
                required
              />
              <input
                value={lastname}
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
                className="bg-gray-200 rounded-lg w-full sm:w-1/2 text-lg py-2 px-4 placeholder-gray-500"
                type="text"
                name="lastname"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded-lg w-full text-lg py-2 px-4 placeholder-gray-500"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded-lg w-full text-lg py-2 px-4 placeholder-gray-500"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehicle Color:</label>
            <input
              value={vehicleColor}
              placeholder="Color"
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-gray-200 rounded-lg w-full text-lg py-2 px-4 placeholder-gray-500"
              type="text"
              name="color"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehicle Plate:</label>
            <input
              value={vehiclePlate}
              placeholder="Plate"
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-gray-200 rounded-lg w-full text-lg py-2 px-4 placeholder-gray-500"
              type="text"
              name="plate"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Vehicle Capacity:
            </label>
            <input
              value={vehicleCapacity}
              placeholder="Capacity"
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-gray-200 rounded-lg w-full text-lg py-2 px-4 placeholder-gray-500"
              type="number"
              name="capacity"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehicle Type:</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-gray-200 rounded-lg w-full text-lg py-2 px-4 placeholder-gray-500"
              name="type"
              required
            >
              <option value="" disabled>
                Select a vehicle type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <input
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg w-full text-lg py-2 px-4 text-white font-semibold"
            type="submit"
            value="Register"
          />
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-blue-500 hover:text-blue-600"
            to="/captain-login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Captainsignup;
