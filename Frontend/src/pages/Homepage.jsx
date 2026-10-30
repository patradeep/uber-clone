import React, { useState, useRef, useEffect, useContext } from "react";
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
import { UserDataContext } from "../context/UserContext";
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
  const [fare, setFare] = useState({});
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && socket) {
      socket.emit('join', { userType: 'user', userId: user._id });
    }
  }, [user, socket]);

  useEffect(() => {
    if (!socket) return;
    const handleRideConfirmed = (data) => {
      setLookingForDriver(false);
      setDriverDetail(true);
      setRide(data);
    };

    const handleRideStarted = (rideData) => {
      setDriverDetail(false);
      navigate('/final-riding', { state: { ride: rideData } });
    };

    socket.on('ride-confirmed', handleRideConfirmed);
    socket.on('ride-started', handleRideStarted);

    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]);

  const handlePickupChange = async (e) => {
    const input = e.target.value;
    setPicup(input);

    if (input.trim().length < 3) {
      setPickupSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { address: input },
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
    const input = e.target.value;
    setDropoff(input);

    if (input.trim().length < 3) {
      setDestinationSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { address: input },
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

  const search = async () => {
    if (!picup || !dropoff) return;
    setVeiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get_fare`,
        {
          params: { picup, dropoff },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  const submithendler = (e) => {
    e.preventDefault();
    search();
  };

  async function createRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          picup,
          dropoff,
          vehicle: carType
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panRef.current, { height: "350px", opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(pancloseRef.current, { opacity: 1, duration: 0.2 });
    } else {
      gsap.to(panRef.current, { height: "0px", opacity: 0, duration: 0.25, ease: "power2.in" });
      gsap.to(pancloseRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (veiclePanel) {
      gsap.to(veiclePanelRef.current, { y: "0%", autoAlpha: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(veiclePanelRef.current, { y: "100%", autoAlpha: 0, duration: 0.25, ease: "power3.in" });
    }
  }, [veiclePanel]);

  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmRideRef.current, { y: "0%", autoAlpha: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(confirmRideRef.current, { y: "100%", autoAlpha: 0, duration: 0.25, ease: "power3.in" });
    }
  }, [confirmRide]);

  useGSAP(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDriverRef.current, { y: "0%", autoAlpha: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(lookingForDriverRef.current, { y: "100%", autoAlpha: 0, duration: 0.25, ease: "power3.in" });
    }
  }, [lookingForDriver]);

  useGSAP(() => {
    if (driverDetail) {
      gsap.to(DriverDetailRef.current, { y: "0%", autoAlpha: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(DriverDetailRef.current, { y: "100%", autoAlpha: 0, duration: 0.25, ease: "power3.in" });
    }
  }, [driverDetail]);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-neutral-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Interactive Leaflet Map */}
      <div className="absolute inset-0 w-full h-full z-0">
        <LiveTracking pickup={picup} dropoff={dropoff} />
      </div>

      {/* 2. Search & Location Panel Container (Constrained width, centered) */}
      <div className="absolute inset-0 flex flex-col justify-end w-full pointer-events-none z-30">
        <div className="max-w-lg mx-auto w-full pointer-events-auto bg-white rounded-t-3xl shadow-2xl border-t border-neutral-100 overflow-hidden">
          {/* Header & Inputs */}
          <div className="relative p-5 pb-3">
            <div
              ref={pancloseRef}
              onClick={() => setPanelOpen(false)}
              className="top-4 right-4 absolute cursor-pointer w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-all opacity-0"
            >
              <i className="ri-arrow-down-s-line text-xl"></i>
            </div>
            <h4 className="text-xl font-extrabold text-neutral-900 tracking-tight mb-3">
              Find a trip
            </h4>
            <form onSubmit={submithendler} className="space-y-2.5">
              <div className="relative">
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("picup");
                  }}
                  value={picup}
                  onChange={handlePickupChange}
                  className="bg-neutral-100 focus:bg-white focus:border-neutral-900 border border-transparent w-full rounded-2xl px-5 py-3 text-sm font-semibold outline-none transition-all placeholder:text-neutral-400"
                  type="text"
                  placeholder="Add a pick-up location"
                />
              </div>
              <div className="relative">
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("dropoff");
                  }}
                  value={dropoff}
                  onChange={handleDestinationChange}
                  className="bg-neutral-100 focus:bg-white focus:border-neutral-900 border border-transparent w-full rounded-2xl px-5 py-3 text-sm font-semibold outline-none transition-all placeholder:text-neutral-400"
                  type="text"
                  placeholder="Enter your destination"
                />
              </div>
              <button
                onClick={search}
                type="submit"
                className="bg-neutral-950 hover:bg-neutral-800 w-full text-white font-bold rounded-2xl py-3.5 px-4 mt-2 transition-all shadow-lg shadow-neutral-950/20 active:scale-[0.99]"
              >
                Search
              </button>
            </form>
          </div>

          {/* Location Suggestions (Constrained height with scroll) */}
          <div ref={panRef} className="h-0 bg-white overflow-y-auto px-4 max-h-[55vh]">
            <LocationPanel
              suggestions={
                activeField === "picup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPicup={(val) => {
                setPicup(val);
                setPanelOpen(false);
              }}
              setDropoff={(val) => {
                setDropoff(val);
                setPanelOpen(false);
              }}
              activeField={activeField}
            />
          </div>
        </div>
      </div>

      {/* 3. Sliding Panel: VeiclePanel (Max-width & max-height constrained) */}
      <div
        ref={veiclePanelRef}
        style={{ visibility: 'hidden', opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto w-full z-40 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-neutral-100 max-h-[85vh] overflow-y-auto translate-y-full"
      >
        <VeiclePanel
          fare={fare}
          setVeiclePanel={setVeiclePanel}
          setCarType={setCarType}
          setConfirmRide={setConfirmRide}
        />
      </div>

      {/* 4. Sliding Panel: ConformRide (Max-width & max-height constrained) */}
      <div
        ref={confirmRideRef}
        style={{ visibility: 'hidden', opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto w-full z-40 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-neutral-100 max-h-[85vh] overflow-y-auto translate-y-full"
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

      {/* 5. Sliding Panel: LookingForDriver (Max-width & max-height constrained) */}
      <div
        ref={lookingForDriverRef}
        style={{ visibility: 'hidden', opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto w-full z-40 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-neutral-100 max-h-[85vh] overflow-y-auto translate-y-full"
      >
        <LookingForDriver
          carType={carType}
          fare={fare}
          picup={picup}
          dropoff={dropoff}
        />
      </div>

      {/* 6. Sliding Panel: DriverDetail (Max-width & max-height constrained) */}
      <div
        ref={DriverDetailRef}
        style={{ visibility: 'hidden', opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto w-full z-40 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-neutral-100 max-h-[85vh] overflow-y-auto translate-y-full"
      >
        <DriverDetail carType={carType} ride={ride} />
      </div>
    </div>
  );
}

export default Homepage;
