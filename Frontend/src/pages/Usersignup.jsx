import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserDataContext} from "../context/Usercontext";
import axios from "axios";


const Usersignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("")
  
  const navigate = useNavigate();

  const {user,setUser}=useContext(UserDataContext)

  const SubmitHandler = async(e) => {
    e.preventDefault();
    const newUser={ name:{firstname,lastname},email, password }
    // call login API here
    // for now, I'll just console.log the values
    const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
   if(responce.status===201){
      setUser(responce.data.user)
      localStorage.setItem('token', responce.data.token)
      navigate("/home");
    }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="p-7 flex flex-col items-center h-screen justify-between">
      <div>
        <h1 className="text-center text-xl mb-2">Create Your Account</h1>
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <label className="mb-2">Name:</label>
          <div className="flex gap-4">
            <input
              value={firstname}
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)} // add this line to update state when input changes
              className="bg-[#eeeeee] rounded-lg w-1/2 text-lg py-1 px-4 placeholder:text-base"
              type="text"
              name="firstname"
              required
            />

            <input
              value={lastname}
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)} // add this line to update state when input changes
              className="bg-[#eeeeee] rounded-lg w-1/2 text-lg py-1 px-4 placeholder:text-base"
              type="text"
              name="lastname"
              required
            />
          </div>
          <label className="mb-2">Email:</label>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} // add this line to update state when input changes
            className="bg-[#eeeeee] rounded-lg w-full text-lg py-1 px-4 placeholder:text-base"
            type="email"
            name="email"
            required
          />
          <label className="mb-2">Password:</label>
          <input
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} // add this line to update state when input changes
            className="bg-[#eeeeee] rounded-lg w-full text-lg py-1 px-4 placeholder:text-base"
            type="password"
            name="password"
            required
          />
          <input
            className="cursor-pointer m-2 bg-blue-600 hover:bg-blue-700 rounded-lg w-full text-lg py-1 px-4 text-white"
            type="submit"
            value="Create Account"
          />
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-600"
            href="/login"
          >
            Login
          </a>
        </p>
      </div>
      
    </div>
  );
};

export default Usersignup;
