import { NavLink, Outlet } from 'react-router-dom'
import { HouseIcon, HousePlus, UserRound } from 'lucide-react'
import { useLocation } from 'react-router-dom';




const User = () => {
  const location = useLocation();

  const isProfileActive = location.pathname === "/user" || location.pathname === "/user/userdetails";

  return (
    <main className='min-h-screen w-full font-[Satoshi]'>
      <div className='mt-16 flex flex-col lg:flex-row'>
        {/* Sidebar */}
        <div className='bg-cyan-900 text-white w-full lg:w-1/5 lg:min-h-screen py-4 px-4'>
          <div className='flex lg:flex-col gap-4'>

            <NavLink
              to="userdetails"
              className={`lg:flex-row flex flex-col items-center gap-2 p-2 rounded-lg transition ${isProfileActive ? 'bg-amber-400 text-black' : 'hover:bg-amber-400 hover:text-black'
                }`}
            >
              <UserRound />
              <span className='font-semibold text-lg'>Profile</span>
            </NavLink>



            <NavLink
              to="addlisting"
              className={({ isActive }) =>
                `lg:flex-row flex flex-col items-center gap-2 p-2 rounded-lg transition ${isActive ? 'bg-amber-400 text-black' : 'hover:bg-amber-400 hover:text-black'
                }`
              }
            >
              <HousePlus />
              <span className='font-semibold text-lg'>Add Listing</span>
            </NavLink>

            <NavLink
              to="viewlistings"
              className={({ isActive }) =>
                `lg:flex-row flex flex-col items-center gap-2 p-2 rounded-lg transition ${isActive ? 'bg-amber-400 text-black' : 'hover:bg-amber-400 hover:text-black'
                }`
              }
            >
              <HouseIcon />
              <span className='font-semibold text-lg'>View Listings</span>
            </NavLink>

          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 bg-gray-100 p-3'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default User
