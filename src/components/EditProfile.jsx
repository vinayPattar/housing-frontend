import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import toast from "react-hot-toast";
import { useMyContext } from "../store/Context";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const { currentUser, setCurrentUser } = useMyContext();
  const navigate = useNavigate();
  // const [imagePreview, setImagePreview] = useState("https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg")

  // const handleChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setImagePreview(imageURL);
  //   }
  // }

  const { register, handleSubmit, reset,
    setError,
    formState: { errors }, } = useForm();

  const handleForm = async (data) => {
    console.log(data)
    try {
      const response = await api.post('/auth/private/updateuser', data);
      setCurrentUser(response.data)
      toast.success("Details Updated successfully")
      navigate(-1)
    } catch (error) {
      toast.error(error)
      if (!error.response) {
        // No response from server (connection refused or CORS)
        toast.error("Server is unreachable. Check your internet or server connection.");
      } else if (error.response.status === 403 && error.response.data?.message?.includes('CSRF')) {
        // CSRF-specific issue
        toast.error("Session expired or CSRF token missing. Please refresh and try again.");
      } else if (error.response.status === 401) {
        toast.error("Invalid user. Please try again.");
      } else {
        // Generic fallback
        toast.error(error.response.data?.message || "An unexpected error occurred.");
      }
    }

  }

  useEffect(() => {

  }, [handleForm])



  return (
    <div className="bg-white shadow-md w-full h-screen rounded-lg font-[Satoshi] p-6">
      <h2 className="text-3xl font-semibold mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit(handleForm)} className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <img
            className="w-24 h-24 rounded-full object-cover bg-gray-300"
            src={"https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg"}
            alt="Profile"
          />
          {/* <input onChange={handleChange} type="file" accept="image/*" className="block " /> */}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...register('fullName', {
              minLength: { value: 5, message: 'Minimum 6 characters' }
            })}
            defaultValue={currentUser.fullName}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          {errors.fullName && (
            <p className="text-sm font-semibold text-red-500 mt-0">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input

            type="text"
            defaultValue={currentUser.username}// or just username
            readOnly
            className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:outline-none cursor-not-allowed"
          />
          <p className="text-red-600 text-sm">*You cant change the username*</p>
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register('email', {
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })}
            type="email"
            defaultValue={currentUser.email}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          {errors.email && (
            <p className="text-sm font-semibold text-red-500 mt-0">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            {...register('phoneNumber', {
              minLength: { value: 6, message: 'Minimum 6 characters' },
              maxLength: { value: 10, message: 'Max 10 charecters' }
            })}
            type="text"
            defaultValue={currentUser.phoneNumber}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          {errors.phoneNumber && (
            <p className="text-sm font-semibold text-red-500 mt-0">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            defaultValue="Bengaluru, India"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div> */}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 flex items-center gap-2"
          >
            <Save size={18} /> Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 flex items-center gap-2"
          >
            <X size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
