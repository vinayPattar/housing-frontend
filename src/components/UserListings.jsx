import React, { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import api from '../services/api';

const UserListings = () => {

  const [listings, setListings] = useState([]);

  useEffect(() => {

    const fetchUserListings = async () => {
      const response = await api.get('/private/listings')
      setListings(response.data);
    }

    fetchUserListings();
  }, [])

  return (
    <div className="bg-white shadow-md w-full min-h-[calc(100vh-74px)] rounded-lg font-[Satoshi] px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl text-center font-semibold tracking-tight mb-6">View your Listings</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item, index) => {
          return <ListingCard key={index} item={item} />
        }

        )}
      </div>
    </div>
  )
}

export default UserListings
