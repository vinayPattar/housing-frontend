import { Building2, Search, Star } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DreamHome?</h2>
          <p className="text-gray-600">We make finding your perfect home simple and enjoyable</p>
        </div>
        <div className="grid  md:grid-cols-3 gap-8">
          <div className="bg-white hover:shadow-2xl  transform transition-transform duration-300 hover:scale-105 p-6 rounded-lg shadow-md text-center">
            <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
            <p className="text-gray-600">Find properties that match your criteria with our powerful search tools</p>
          </div>
          <div className="bg-white p-6 hover:shadow-2xl  transform transition-transform duration-300 hover:scale-105 rounded-lg shadow-md text-center">
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600">All our properties are verified to ensure quality and authenticity</p>
          </div>
          <div className="bg-white hover:shadow-2xl  transform transition-transform duration-300 hover:scale-105 hover: p-6 rounded-lg shadow-md text-center">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
            <p className="text-gray-600">Make informed decisions with genuine reviews from our community</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
