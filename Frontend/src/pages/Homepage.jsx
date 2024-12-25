import React, { useState, useRef, useEffect,useContext } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import LocationPanel from "../components/LocationPanel";
import VeiclePanel from "../components/VeiclePanel";
import ConformRide from "../components/ConformRide";
import LookingForDriver from "../components/LookingForDriver";
import DriverDetail from "../components/DriverDetail";
import { SocketContext } from "../context/socketContext";
import {UserDataContext} from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";

function Homepage() {
  const [picup, setPicup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [veiclePanel, setVeiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [carType, setCarType] = useState(null);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [driverDetail, setDriverDetail] = useState(false);
  const panRef = useRef(null);
  const pancloseRef = useRef(null);
  const veiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const DriverDetailRef = useRef(null);
  const [ride, setRide] = useState(null);
  

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({})
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      socket.emit('join',{userType: 'user', userId:user._id});
    }
  },[user])

  socket.on('ride-confirmed', (data) => {
    setLookingForDriver(false);
    setDriverDetail(true);
    setRide(data);
  })

  const handlePickupChange = async (e) => {
    const input = e.target.value.trim();
  setPicup(input);

  if (input.length < 3) {
    console.error("Input too short for suggestions.");
    setDestinationSuggestions([]);
    return;
  }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { address: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(
        Array.isArray(response.data.suggestions)
          ? response.data.suggestions
          : []
      );
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    const input = e.target.value.trim();
  setDropoff(input);

  if (input.length < 3) {
    console.error("Input too short for suggestions.");
    setDestinationSuggestions([]);
    return;
  }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { address: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(
        Array.isArray(response.data.suggestions)
          ? response.data.suggestions
          : []
      );
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

  const search = async() => {
    setVeiclePanel(true);
    setPanelOpen(false);
    try{
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get_fare`,
        {
          params: { picup,dropoff },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    }catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

  const submithendler = (e) => {
    e.preventDefault();
    // perform the form submission logic here
  };

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        picup,
        dropoff,
        vehicle:carType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }) 
    
}

socket.on('ride-started', (ride) => {
  setDriverDetail(false);
  navigate('/final-riding', { state: { ride } });
})


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panRef.current, { height: "65%" });
      gsap.to(pancloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panRef.current, { height: "0%" });
      gsap.to(pancloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (veiclePanel) {
      gsap.to(veiclePanelRef.current, { transform: "translatey(0)" });
    } else {
      gsap.to(veiclePanelRef.current, { transform: "translatey(100%)" ,visibility: "hidden" });
    }
  }, [veiclePanel]);

  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmRideRef.current, { transform: "translatey(0)" });
    } else {
      gsap.to(confirmRideRef.current, { transform: "translatey(100%)" ,visibility: "hidden" });
    }
  }, [confirmRide]);

  useGSAP(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDriverRef.current, { transform: "translatey(0)" });
    } else {
      gsap.to(lookingForDriverRef.current, { transform: "translatey(100%)" ,visibility: "hidden" });
    }
  }, [lookingForDriver]);

  useGSAP(() => {
    if (driverDetail) {
      gsap.to(DriverDetailRef.current, { transform: "translatey(0)" });
    } else {
      gsap.to(DriverDetailRef.current, { transform: "translatey(100%)" ,visibility: "hidden" });
    }
  }, [driverDetail]);

  

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="h-screen w-screen">
        <LiveTracking/>
      </div>
      <div className="absolute h-screen top-0 flex flex-col justify-end w-full">
        <div className="h-[35%] relative bg-white p-2 ">
          <div
            ref={pancloseRef}
            onClick={() => setPanelOpen(false)}
            className="top-2 right-4 absolute"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </div>
          <h4 className="text-xl font-semibold">Find a trip</h4>
          <form onSubmit={submithendler}>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("picup");
              }}
              value={picup}
              onChange={handlePickupChange}
              className="bg-[#eee] placeholder:text-center w-full rounded-lg mt-2 px-7 py-2"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("dropoff");
              }}
              value={dropoff}
              onChange={handleDestinationChange}
              className="bg-[#eee] w-full placeholder:text-center rounded-lg mt-2 px-7 py-2"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              onClick={search}
              type="submit"
              className="bg-blue-500 w-full text-white rounded-full py-2 px-4 mt-2"
            >
              Search
            </button>
          </form>
        </div>
        <div ref={panRef} className="h-0 bg-white">
          <LocationPanel
            suggestions={
              activeField === "picup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPicup={setPicup}
            setDropoff={setDropoff}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={veiclePanelRef}
        className="fixed bottom-0 w-full bg-white translate-y-full px-2 py-4"
      >
        <VeiclePanel
          fare={fare}
          setVeiclePanel={setVeiclePanel}
          setCarType={setCarType}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed bottom-0 w-full bg-white translate-y-full px-2 py-4"
      >
        <ConformRide
          fare={fare}
          picup={picup}
          dropoff={dropoff}
          createRide={createRide}
          carType={carType}

          setLookingForDriver={setLookingForDriver}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed bottom-0 w-full translate-y-full bg-white px-2 py-4 "
      >
        <LookingForDriver 
        carType={carType}
        fare={fare}
          picup={picup}
          dropoff={dropoff}
         />
      </div>
      <div
        ref={DriverDetailRef}
        className="fixed bottom-0 w-full translate-y-full bg-white px-2 py-4 "
      >
        <DriverDetail carType={carType} ride={ride} />
      </div>
    </div>
  );
}

export default Homepage;
