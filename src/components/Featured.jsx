import React, { useEffect, useState } from 'react'
import { Home, Building2, Search, Star, DollarSign, MapPin, BedDouble, Bath, Ruler, Heart, ChevronDown } from 'lucide-react';
import ListingCard from './ListingCard';
import api from '../services/api';

const Featured = () => {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('public/listings/cards');
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listing cards:", error);
      }
    };

    fetchListings();
  }, []);

  // console.log(listings)


  return (
    <>
      {listings.length > 0 ? <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
          <a href="#" className="text-blue-600 hover:text-blue-700">View all properties →</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item, index) => {
            return <ListingCard key={index} item={item} />
          }

          )}
        </div>
      </div> : <p className='text-center my-10 font-semibold'>Loading...</p>}
    </>
  )
}

export default Featured
