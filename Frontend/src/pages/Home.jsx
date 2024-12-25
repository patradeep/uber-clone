import React from 'react'
import Logo from '../assets/uberlogo.png'
import { Link } from 'react-router-dom'
const Home = () => {
  
  return (
    <div className='bg-cover bg-[url(https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600)] sm:bg-[url(https://media.istockphoto.com/id/1354259171/photo/happy-driver-picking-up-a-new-passenger.jpg?s=1024x1024&w=is&k=20&c=Li8L_yyHlmGNjHSXbChWPEDYBnhp5WiuwsHQI52G-Ew=)] h-screen w-full flex flex-col justify-between bg-red-200 '>
      <img className='w-16 mt-5 ml-2' src={Logo} alt="Uber logo" />
      <div className='bg-white py-4 px-4'>
        <h2 className='text-2xl text-center'>Get Started With Uber</h2>
        <Link to={'/login'} className='flex items-center justify-center w-full mt-2 py-2 rounded-md bg-black text-xl text-white'>Continue</Link>
      </div>
    </div>
  )
}

export default Home