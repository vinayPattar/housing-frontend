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
import User from './pages/User'
import Profile from './components/Profile'
import CreateListing from './pages/CreateListing'
import EditProfile from './components/EditProfile'
import ProtectedRoute from './components/ProtectedRoute'
import ListingDetail from './pages/ListingDetail'
import UserListings from './components/UserListings'

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path="/user" element={<User />}>
          <Route index element={<Profile />} /> {/* This is the fix! */}
          <Route path="userdetails" element={<Profile />} />
          <Route path="addlisting" element={<CreateListing />} />
          <Route path="viewlistings" element={<UserListings />} />
          <Route path="editprofile" element={<EditProfile />} />
          {/* Add more subroutes here */}
        </Route>
        <Route path='/listing-details/:id' element={<ListingDetail />} />
        {/* <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>}>
          <Route path="userdetails" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="addlisting" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
          <Route path="editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          {/* Add more subroutes here */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter >
  )
}

export default App
