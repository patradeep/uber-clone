import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserDataContext} from "../context/UserContext";
import axios from "axios";

const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user,setUser}=useContext(UserDataContext);
  const navigate = useNavigate();

  const SubmitHandler = async(e) => {
    e.preventDefault();
    // call login API here
    // for now, I'll just console.log the values
    const userData={email,password};
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status===201){
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // add this line to update user context when login successful
      
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col items-center h-screen justify-between">
      <div>
        <h1 className="text-center text-xl">User Login</h1>
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <label className="mb-2">Email:</label>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} // add this line to update state when input changes
            className="bg-[#eeeeee] rounded-lg w-full text-lg py-1 px-4"
            type="email"
            name="email"
            required
          />
          <label className="mb-2">Password:</label>
          <input
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} // add this line to update state when input changes
            className="bg-[#eeeeee] rounded-lg w-full text-lg py-1 px-4"
            type="password"
            name="password"
            required
          />
          <input
            className="cursor-pointer m-2 bg-blue-600 hover:bg-blue-700 rounded-lg w-full text-lg py-1 px-4 text-white"
            type="submit"
            value="Login"
          />
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <a className="text-blue-500 hover:text-blue-600" href="/signup">
            Register
          </a>
        </p>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className="flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-lg  w-full text-lg py-1 px-4 text-white"
        >
          Sign In as a caption
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;
