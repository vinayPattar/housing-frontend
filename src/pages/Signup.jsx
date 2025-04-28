import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../UIComonents/InputField';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Signup = ({ autoFocus }) => {
  const navigate = useNavigate();

  const { register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }, } = useForm();

  const handleForm = async (data) => {
    console.log(data)

    try {
      const response = await api.post('/auth/public/signup', data)
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }



  return (
    <div className='signup w-full min-h-[calc(100vh-74px)] flex justify-center items-center'>
      <form onSubmit={handleSubmit(handleForm)} className='w-360 lg:w-100 sm:w-100 mx-10 bg-white shadow-2xl py-6 sm:px-8 px-4 rounded-lg ' >
        <div className='my-5'>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Register Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to create new account
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
              } placeholder="Enter your username" name="username" type="text" />
            {errors.username && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.username.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input {...register('email', {
              required: 'email is required',
              minLength: { value: 5, message: 'Minimum 5 characters' }
            })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
              }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`} placeholder="Enter your email" name="email" type="email" />
            {errors.email && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.email.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input {...register('fullName', {
              required: 'name is required',
              minLength: { value: 5, message: 'Minimum 5 characters' }
            })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
              }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`} placeholder="Enter your name" name="fullName" type="text" />
            {errors.fullName && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.fullName.message}</p>
            )}

          </div>
          <div className='flex flex-col'>
            <input {...register('phoneNumber', {
              required: 'Phone no is required',
              minLength: { value: 10, message: 'Minimum 10 characters' }
            })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
              }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`} placeholder="Enter your phone no" name="phoneNumber" type="text" required />
            {errors.phoneNumber && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input {...register('password', {
              required: 'password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
              }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`} placeholder="Enter your password" name="password" type="password" />
            {errors.password && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.password.message}</p>
            )}
          </div>
          <input type="submit" value={'Register'} className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out  text-white py-2 px-4 rounded-xl cursor-pointer ' name="" id="" />
          <p className="text-center text-sm text-slate-700 mt-2">
            Already have an account?{" "}
            <Link
              className="font-semibold underline hover:text-black"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>

    </div>
  );
};

export default Signup;
