import { House, HousePlus, User2, User2Icon, UserCircle, UserRound, UserX2Icon } from 'lucide-react'
import React from 'react'
import { FaCreativeCommonsBy } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'

const UserNav = () => {
  return (
    <div className='min-h-screen lg:mt-16 flex flex-col lg:flex-row sm:flex-row '>
      <div className='lg:h-screen sm:h-screen h-auto w-full lg:w-1/6  py-2 backdrop-blur-lg lg:max-w-1/6 sm:max-w-1/6'>
        <div className=' w-full px-3 lg:mt-6 flex lg:flex-col flex-shrink-0 sm:flex-col items-center lg:justify-center lg:items-baseline justify-between  lg:gap-3 pb-1000000'>
          <div className='flex flex-col px-6 py-3 lg:flex-row lg:gap-1 hover:bg-amber-400 hover:py-3 hover:rounded-lg hover:px-6 transform transition-transform duration-300 ease-in-out items-center'>
            <UserRound className='text-3xl font-semibold' />
            <Link className='font-semibold lg:text-2xl' to="/userdetails" >Profile</Link>
          </div>
          <div className='flex flex-col px-6 py-3 lg:flex-row lg:gap-1 hover:bg-amber-400 hover:py-3 hover:rounded-lg hover:px-6 transform transition-transform duration-300 ease-in-out items-center'>
            <HousePlus className='text-3xl' />
            <Link className='font-semibold lg:text-2xl' to="/">Add Listing</Link>
          </div>
          <div className='flex flex-col px-6 py-3 lg:flex-row lg:gap-1 hover:bg-amber-400 hover:py-3 hover:rounded-lg hover:px-6 transform transition-transform duration-300 ease-in-out items-center'>
            <House className='text-3xl' />
            <Link className='font-semibold lg:text-2xl' to="/">Add Listing</Link>
          </div>
        </div>
      </div>

      <div className='w-full h-full  bg-gray-600'>
        <Outlet />
      </div>

    </div>
  )
}

export default UserNav
