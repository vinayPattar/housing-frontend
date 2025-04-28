import { Edit, Mail, MapPin, Phone } from "lucide-react"
import { useContext, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useMyContext } from "../store/Context";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useMyContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/private/user');
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);



  return (
    <div className="bg-white shadow-md w-full min-h-[calc(100vh-74px)] rounded-lg font-[Satoshi] px-4 sm:px-6 lg:px-8 py-4">
      <Outlet />

      {currentUser && (
        <div className="w-full h-full space-y-6">
          {/* Profile Card */}
          <div className="shadow p-4 sm:p-6 transform transition-all duration-300 hover:shadow-lg bg-cyan-600 backdrop-blur-lg rounded-lg flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-700"
              src="https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg"
              alt="Profile"
            />

            <div className="flex flex-col text-white">
              <p className="text-2xl sm:text-3xl font-semibold">{currentUser.fullName}</p>
              <p className="text-lg">@{currentUser.username}</p>
            </div>

            <Link to="/user/editprofile" className="md:ml-auto">
              <button
                className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
              >
                <Edit size={18} className="mr-2" />
                Edit Profile
              </button>
            </Link>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                  <Mail size={18} className="text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm">Email</p>
                  <p className="font-medium">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg mr-4">
                  <Phone size={18} className="text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm">Phone</p>
                  <p className="font-medium">{currentUser.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg mr-4">
                  <MapPin size={18} className="text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm">Location</p>
                  <p className="font-medium">bnglrerfnejf</p>
                </div>
              </div>
            </div>
          </div>

          {/* Favourites */}
          <div className="shadow p-4 sm:p-6 transform transition-all duration-300 hover:shadow-lg backdrop-blur-lg rounded-lg">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">Favourites</h1>
            <p>Favourite Cards goes here...</p>
          </div>
        </div>
      )}
    </div>

  )
}

export default Profile
