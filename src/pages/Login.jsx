import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import { useMyContext } from '../store/Context';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = ({ autoFocus }) => {

  const navigate = useNavigate();

  const { register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }, } = useForm();
  const { currentUser, setCurrentUser } = useMyContext(null);

  const [token, setToken] = useState("");


  const handleLogin = (resData) => {
    console.log(resData)
    const user = {
      username: resData.username,
      roles: resData.roles ? resData.roles : [],

    };

    console.log(user);

    localStorage.setItem("USER", JSON.stringify(user));
    localStorage.setItem("JWT_TOKEN", resData.token);

    //store the token on the context state  so that it can be shared any where in our application by context provider
    setToken(resData.token);
    console.log(token);
    setCurrentUser(user); // update context

    navigate("/");
    window.location.reload();
  };


  useEffect(() => {
    if (token) navigate("/");

  }, [navigate, token]);

  const handleForm = async (data) => {
    try {
      const response = await api.post('/auth/public/signin', data);
      handleLogin(response.data);
      console.log(response.data);
      toast.success("Login Successful");
    } catch (error) {
      if (!error.response) {
        // No response from server (connection refused or CORS)
        toast.error("Server is unreachable. Check your internet or server connection.");
      } else if (error.response.status === 403 && error.response.data?.message?.includes('CSRF')) {
        // CSRF-specific issue
        toast.error("Session expired or CSRF token missing. Please refresh and try again.");
      } else if (error.response.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else if (error.response.status === 404) {
        toast.error("User Not Found, Check your credentials.");
      }

      console.error("Login error:", error);
    }
  };



  return (
    <div className='signup w-full min-h-[calc(100vh-74px)] flex justify-center items-center'>
      <form onSubmit={handleSubmit(handleForm)} className='w-360 lg:w-100 sm:w-100 mx-10 bg-white shadow-2xl py-6 sm:px-8 px-4 rounded-lg ' >
        <div className='my-3'>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Login Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to Login
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <input {...register('username', {
              required: 'Username is required',
              minLength: { value: 5, message: 'Minimum 5 characters' }
            })}
              className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
                }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`
              } placeholder="Enter your username"
              defaultValue={"admin"}
              name="username" type="text" />
            {errors.username && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.username.message}</p>
            )}
          </div>
          <input {...register('password', {
            required: 'password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' }
          })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
            }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`} placeholder="Enter your password" name="password"
            defaultValue={"adminPass"}
            type="password" />
          {errors.password && (
            <p className="text-sm font-semibold text-red-500 mt-0">{errors.password.message}</p>
          )}
          <input type="submit" value={'Login'} className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out  text-white py-2 px-4 rounded-xl cursor-pointer ' name="" id="" />
          <p className="text-center text-sm text-slate-700 mt-2">
            Dont have an account?{" "}
            <Link
              className="font-semibold underline hover:text-black"
              to="/signup"
            >
              Signup
            </Link>
          </p>
        </div>
      </form>

    </div>
  )
}

export default Login
