import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CaptainProtectedWrapper({ children }) {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        console.log(error);
        navigate("/captain-login");
      });
  }, [token]);

  return <>{children}</>;
}

export default CaptainProtectedWrapper;