import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ListingCard from './components/ListingCard'

import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/' element={<Cards />} /> */}
        {/* <Route path='/listings/1BHK house' element={<Home />} /> */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>

    </BrowserRouter>
  )
}

export default App
