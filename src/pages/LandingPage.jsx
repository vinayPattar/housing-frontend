import React from 'react'
import Header from '../components/Header'
import { Home, Building2, Search, Star, DollarSign, MapPin, BedDouble, Bath, Ruler, Heart, ChevronDown } from 'lucide-react';
import Featured from '../components/Featured';
import Features from '../components/Features';

const LandingPage = () => {


  return (
    <div className="bg-white min-h-screen w-screen max-h-screen font-[Satoshi]">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pt-5 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Discover Your Perfect Space
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Your dream home is just a few clicks away. Start your journey today.
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by location, property type, or keywords..."
                      className="w-full ml-2 focus:outline-none"
                    />
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Featured />
      <Features />
      {/* <Cards /> */}

    </div>
  )
}

export default LandingPage
