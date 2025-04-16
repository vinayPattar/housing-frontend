import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import { useMyContext } from '../store/Context';

const Login = () => {
  const { currentUser, setCurrentUser } = useMyContext(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [form, setForm] = React.useState({
    username: '',
    password: ''
  });

  const handleSuccessfulLogin = (token, decodedToken, jsData) => {
    const user = {
      username: decodedToken.sub,
      roles: jsData.roles ? jsData.roles : [],
    };

    localStorage.setItem("USER", JSON.stringify(user));
    //store the token on the context state  so that it can be shared any where in our application by context provider
    setToken(token);
    setCurrentUser(user); // update context

    navigate("/");
    window.location.reload();
  };


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value

    })
  }

  useEffect(() => {
    if (token) navigate("/");

  }, [navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log("Form submitted with:", form);

      const response = await api.post('auth/public/signin', form);

      const jsData = response.data;
      console.log("Login response:", jsData);


      const token = jsData.token;
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // decode JWT payload

      // Save to localStorage
      localStorage.setItem("JWT_TOKEN", token);

      handleSuccessfulLogin(token, decodedToken, jsData);

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed! Please check credentials or try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='mt-20 flex flex-col items-center justify-center'>
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name='username' onChange={handleChange} required placeholder="Username" className="block mb-2" />
        <input type="password" name='password' onChange={handleChange} required placeholder="Password" className="block mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login
