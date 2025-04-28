import React, { useContext } from 'react'
import { FaBath, FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md';
import { Home, Building2, Search, Star, DollarSign, MapPin, BedDouble, Bath, Ruler, Heart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ListingCard = ({ item }) => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/listing-details/${id}`);
  }

  return (

    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img src={item.imageUrl} alt={item.name} className=" transform transition-transform duration-300 hover:scale-105 w-full h-48 object-cover" />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        <p></p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          {/* <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-600">{rating}</span>
          </div> */}
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{item.address}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1" />
              <span>{item.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{item.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-1" />
              <span>{item.size} sqft</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">{item.offerPrice}</span>
            {item.type == 'rent' && <span className="text-gray-600">/month</span>}

          </div>
          <button onClick={() => handleClick(item.id)} className="text-blue-600 cursor-pointer hover:text-blue-700 font-semibold">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
