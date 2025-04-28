import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ListingDetail = () => {

  const [listing, setListing] = useState();

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    const ListingDetail = async () => {
      try {
        const details = await api.get(`/public/listings/${id}`)
        console.log(details)
        setListing(details.data);
      } catch (error) {
        console.log(error)
        toast.error("error fetching details")
      }
    }

    ListingDetail();
  }, []);

  console.log(listing)

  return (
    <main className="min-h-screen w-full bg-gray-100 p-4 mt-20">

      {listing ?
        <>
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <img
              src={listing.imageUrls && listing.imageUrls.length > 0 ? listing.imageUrls[0] : "https://via.placeholder.com/400x300?text=No+Image"}
              alt="Main Image"
              className="w-full h-full object-cover"
            />
          </div>

          <section className="mb-6">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{listing.name}</h1>
            <p className="text-lg text-gray-700 mb-1">{listing.address}, {listing.city}, {listing.state} - {listing.pincode}</p>

            <div className="flex flex-wrap gap-4 text-gray-800 mt-2">
              <span className="font-semibold text-xl">₹ {listing.offer ? listing.discountPrice : listing.regularPrice}</span>
              {listing.offer && (
                <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm">Offer Active!</span>
              )}
              <span className="bg-cyan-200 text-cyan-900 px-3 py-1 rounded-full text-sm">{listing.type}</span>
              <span>{listing.size} sq ft</span>
              <span>{listing.bedrooms} Beds</span>
              <span>{listing.bathrooms} Baths</span>
            </div>

            <div className="flex gap-4 mt-4">
              {listing.furnished && (
                <span className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-sm">Furnished</span>
              )}
              {listing.parking && (
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm">Parking Available</span>
              )}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listing.imageUrls.map((url, idx) => (
                <img key={idx} src={url} alt={`Listing ${idx}`} className="w-full h-40 object-cover rounded-lg" />
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {listing.amenities.map((amenity, idx) => (
                <span key={idx} className="flex items-center gap-2 bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm">
                  ✅ {amenity}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </section>

          <div className="fixed bottom-6 right-6">
            <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition">
              Contact Seller
            </button>
          </div>
        </>
        : <p>No details</p>}

    </main>
  );
};

export default ListingDetail;
