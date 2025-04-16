import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: ['USER'] // You can change this later to allow selecting role
  });

  const handleChange = (e) => {
      setForm({ ...form, 
      [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      console.log(form);
      await api.post('/auth/public/signup', form);
      alert("Signup successful!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };
  // 

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input name="fullName" placeholder="Full Name" onChange={handleChange} className="block mb-2" />
      <input name="username" placeholder="Username" onChange={handleChange} className="block mb-2" />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} className="block mb-2" />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} className="block mb-2" />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="block mb-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;
