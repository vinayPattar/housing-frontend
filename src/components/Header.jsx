import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsSearchHeart } from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import { useMyContext } from '../store/Context'
import logo from "../assets/logo1.png"
const Header = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showImageDropdown, setShowImageDropdown] = useState(false);


  const navigate = useNavigate();

  const { token, setToken, currentUser, setCurrentUser, } = useMyContext();

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN"); // Updated to remove token from localStorage
    localStorage.removeItem("USER"); // Remove user details as well
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setShowDropdown(false)
    setShowImageDropdown(false)
    // setIsAdmin(false);
    navigate("/login");
  }


  // const handleMenuClick = () => {

  //   links.classList.toggle("hidden");

  // }
  // border-b-2 border-green-900
  return (
    <nav className='fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 w-full font-[Satoshi] text-black'>

      <div className='flex h-full items-center justify-between mx-8 lg:mx-28 max-w-7xl'>
        <div className='logo lg:w-22 w-18 py-2'>
          <Link to="/"><img className='w-full h-full object-cover' src={logo} alt="" /></Link>
        </div>

        {showDropdown && <div
          id='links'
          className='flg:hidden fixed w-[240px] mt-1 mr-3 z-1000 flex flex-col gap-2 bg-white backdrop-blur-md shadow-sm  text-black font-semibold px-3 py-2 rounded  right-5 top-14'
        >
          {token ? <Link to='/user'>
            <div className="flex gap-3 items-center ">
              <img
                src={currentUser?.profilePic || "https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg"}
                alt="Profile"
                className="h-12 w-12 border-2 border-white rounded-full object-cover"
              />
              <p className="text-sm break-all sm:break-normal  sm:mt-0">
                {currentUser?.email}
              </p>
            </div>
          </Link> : <Link className='text-red-400' onClick={() => setShowDropdown(false)} to={'/login'}>Login</Link>
          }

          <Link className='' to="/">Home</Link>
          <Link className='' to="/search">Browse Listings</Link>
          <Link className='' to="/about">About</Link>
          <Link className='' to="/contact">Contact</Link>
          {token ? <>
            <hr />
            <p onClick={handleLogout} className='text-red-400 cursor-pointer' >Logout</p>
          </> :
            null}
        </div>}

        <div className='hidden gap-4 lg:flex'>
          <NavLink className=" font-medium text-xl hover:opacity-70" style={(e) => {
            return {
              color: e.isActive ? "tomato" : ""
            }
          }} to="/">Home</NavLink>

          <NavLink className=" font-medium text-xl hover:opacity-70" style={(e) => {
            return {
              color: e.isActive ? "tomato" : ""
            }
          }} to="/listings">Listings</NavLink>
          <NavLink className=" font-medium text-xl hover:opacity-70" style={(e) => {
            return {
              color: e.isActive ? "tomato" : ""
            }
          }} to="/about">About</NavLink>
          <NavLink className=" font-medium hover:opacity-70 text-xl" style={(e) => {
            return {
              color: e.isActive ? "tomato" : ""
            }
          }} to="/contact">Contact</NavLink>
        </div>

        {showImageDropdown &&
          <div className="w-[140px] mr-3  flex flex-col gap-2 bg-[white/80] backdrop-blur-md shadow-lg text-black font-semibold px-3 py-2 rounded  absolute right-28 top-15 ">
            <Link to="/user">Profile</Link>
            <p onClick={handleLogout} className='text-red-400 cursor-pointer' >Logout</p>
          </div>}

        <div className='flex items-center justify-between gap-4'>
          {token ?
            <img
              onClick={() => setShowImageDropdown(prev => !prev)}
              src="https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg"
              alt="Profile"
              className="hidden z-11 lg:block h-12 w-12 border-2 cursor-pointer border-white rounded-full object-cover"
            />
            : <Link className='hidden lg:block text-white bg-red-500 py-1 px-7 rounded hover:bg-red-600 transition-all 300s ease-in-out' onClick={() => setShowDropdown(false)} to={'/login'}>Login</Link>}


          <i onClick={() => setShowDropdown(prev => !prev)} id="menuBtn" class="ri-menu-line text-black text-2xl lg:hidden cursor-pointer"></i>

        </div>

      </div>
    </nav>
  )
}

export default Header
