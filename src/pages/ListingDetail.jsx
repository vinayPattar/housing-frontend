import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BathIcon, Bed, BedDouble, BedIcon, BedSingleIcon, Heart, LocateIcon, MapPin, RulerIcon } from "lucide-react";
import { useMyContext } from "../store/Context";

const ListingDetail = () => {

  const [listing, setListing] = useState();
  const { showFillHeart, setShowFillHeart } = useMyContext();

  const [showContactForm, setShowContactForm] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  const [image, setImage] = useState("");

  const { currentUser, token } = useMyContext();

  const { id } = useParams();
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const ListingDetail = async () => {
      try {
        const details = await api.get(`/public/listings/${id}`)
        setListing(details.data);
        setEmail(details.data.ownerEmail)
        if (details.data.imageUrls && details.data.imageUrls.length > 0) {
          setImage(details.data.imageUrls[0]); // set image here safely
        }
      } catch (error) {
        toast.error("error fetching details")
      }
    }

    ListingDetail();
  }, []);


  const handleContactClick = () => {
    if (!token) {
      toast.error("Login to contact seller")
      return;
    }
    setShowContactForm(prev => !prev);
  };

  const handleSendMessage = async () => {

    const payload = {
      from: currentUser.email,  // sender's email
      to: listing.ownerEmail, // recipient
      subject: `Regarding your listing: ${listing.name}`,
      image: `${listing.imageUrls[0]}`,
      userText: `\n\n${messageBody}`  // includes image + user’s message
    };

    // Send it to backend
    console.log(payload)
    // await api.post("/contact", payload);

    setMessageBody("");
    setShowContactForm(false);

  };

  const handleHeart = () => {
    setShowFillHeart(prev => !prev)
  }

  const handleGallery = (url) => {
    setImage(url)
  }


  return (
    <main className="min-h-screen w-full lg:w-[80%] font-[Satoshi] lg:mx-auto bg-gray-00 p-4 mt-20">

      {listing ?
        <>
          {/* Banner Image */}
          <div className="w-full h-64 md:h-[75vh] rounded-lg overflow-hidden mb-3">
            <img
              src={listing.imageUrls && listing.imageUrls.length > 0 ? image : "https://via.placeholder.com/400x300?text=No+Image"}
              alt="Main Image"
              className="w-full h-full object-cover rounded-lg"
            />
            <button onClick={handleHeart} className="absolute lg:top-30 top-25 right-6 lg:right-50 p-2 bg-white cursor-pointer rounded-full shadow hover:bg-gray-100">
              {showFillHeart ? (
                <Heart className="lg:h-8 h-6 w-6 lg:w-8 text-red-800 fill-red-800" />
              ) : (
                <Heart className="lg:h-8 h-6 w-6 lg:w-8 text-gray-800" />
              )}

            </button>
          </div>

          <section className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {listing.imageUrls.map((url, idx) => (
                <img
                  onClick={() => handleGallery(url)}

                  key={idx} src={url} alt={`Listing ${idx}`} className="w-full lg:w-[55vh] h-44 lg:h-50 object-cover hover:scale-106 transform transition-transform duration-300 rounded-lg" />
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{listing.name}</h1>
            <span className="flex items-center gap-2">
              <MapPin size={20} />
              <p className="text-xl opacity-80 mb-1">{listing.address}, {listing.city}, {listing.state} - {listing.pincode}</p>

            </span>
            <div className="flex flex-wrap gap-4 text-gray-800 mt-3 items-center">
              <span className="font-semibold text-xl flex">₹ {listing.offer ? listing.discountPrice : listing.discountPrice}{listing.type == 'rent' && <p>/month</p>}
                <p className="ml-2 opacity-70  text-md  line-through ">{listing.offer ? listing.discountPrice : listing.regularPrice}</p>
              </span>
              {listing.offer && (
                <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm">Offer Active!</span>
              )}
              <div className=" flex gap-4 items-center ">
                <span className="bg-cyan-200 text-cyan-900 px-4 py-1 font-bold uppercase rounded-full text-md">{listing.type}</span>

              </div>
            </div>


            <div className="flex mt-3 bg-white gap-7 items-center shadow-2xl">
              <div className="flex items-center text-xl">
                <RulerIcon className="h-4 w-4 mr-1" />
                <span>{listing.size} sq ft</span>
              </div>
              <div className="flex items-center text-xl gap-1">
                <BedSingleIcon size={20} />
                <span> {listing.bedrooms} Beds</span>
              </div>
              <div className="flex items-center text-xl gap-1">
                <BathIcon size={20} />
                <span>{listing.bathrooms} Baths</span>
              </div></div>

            <div className="flex gap-4 mt-4 ">
              {listing.furnished && (
                <span className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-sm">Furnished</span>
              )}
              {listing.parking && (
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm">Parking Available</span>
              )}
            </div>
            <section className="mb-2">
              <h2 className="text-xl font-semibold">Owner</h2>
              <p className="text-gray-700 leading-relaxed">{listing.ownerName}</p>
            </section>
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
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </section>


          <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end gap-2">
            <button
              onClick={handleContactClick}
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition"
            >
              Contact Seller
            </button>

            {showContactForm && (
              <div className="w-80 bg-white p-4 rounded-xl shadow-lg border mt-2">
                <p className="font-semibold mb-2">Send a message to the seller</p>
                <textarea
                  rows="4"
                  className="w-full border p-2 rounded-md text-sm"
                  placeholder="Write your message..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md font-semibold"
                >
                  Send Message
                </button>
              </div>
            )}
          </div>

        </>
        : <p>No details</p>}

    </main>
  );
};

export default ListingDetail;
