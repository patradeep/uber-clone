import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserProtrctedWrapper({ children }) {
  const { setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        console.log(error);
        navigate("/login");
      });
  }, [token]);

  return <>{children}</>;
}

export default UserProtrctedWrapper;
