import { BathIcon, Bed, CloudSnow, ImageIcon, IndianRupee, MessageSquareText, Ruler } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api';

const CreateListing = () => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET); // from Cloudinary
      formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // from Cloudinary

      const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
      console.log(cloudName)

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log(data)
        console.log("Uploaded image:", data.secure_url);
        urls.push(data.secure_url);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setImageUrls(urls);
  };


  const handleUploadButtonClick = () => {
    // Add logic to upload the selected files (e.g. to server or Cloudinary)
    console.log("Upload button clicked");
  };


  const handleForm = async (data) => {
    const selectedAmenities = data.amenities || []; // fallback if nothing checked
    const cleanedData = {
      ...data,
      amenities: selectedAmenities,
      imageUrls: imageUrls,
    };

    console.log(cleanedData);

    const request = await api.post('/private/listings/createListing', cleanedData);
    const response = request.data
    console.log("Rsponse from server: " + response)


  }

  return (
    <div className="w-full min-h-screen border-1 rounded-sm font-[Satoshi] px-4 py-6 lg:px-10">
      <h1 className="text-2xl text-center font-semibold tracking-tight mb-6">Create new Listing</h1>

      <form onSubmit={handleSubmit(handleForm)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Property Name</label>
            <input
              defaultValue={'1bhk house'}
              {...register('name', {
                required: 'name is required',
                minLength: 'Min 8 characters required',
              })}
              className="p-2 h-10 rounded border outline-none"
              type="text"
              placeholder="Enter listing name..."
            />
            {errors.name && (
              <p className="text-sm font-semibold text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Property Type */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Property Type</label>
            <select
              defaultValue={'rent'}
              {...register('type', {
                required: 'Property type is required',
                validate: (value) => value !== '' || 'Please select a valid property type',
              })}
              className="p-2 h-10 rounded border outline-none"
            >
              <option value="">Select your property type</option>
              <option value="rent">Rent</option>
              <option value="sell">Sell</option>
              <option value="pg">PG</option>
            </select>
            {errors.type && (
              <p className="text-sm font-semibold text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 lg:col-span-2">
            <label className="font-semibold text-lg">Description</label>
            <textarea
              defaultValue={'1bhk house beatiful is'}
              {...register('description', {
                required: 'description is required',
                minLength: 'Min 7 characters required',
              })}
              className="p-2 rounded border outline-none"
              rows="3"
              placeholder="Enter your property description..."
            />
            {errors.description && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.description.message}</p>
            )}
          </div>

          {/* Address, City, State, Pincode */}
          {['Address', 'City', 'State', 'Pincode'].map((label, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="font-semibold text-lg">{label}</label>
              <input
                {...register(label.toLowerCase(), {
                  required: `${label.toLowerCase()} is required`,
                  minLength: { value: 5, message: 'Minimum 5 characters' }
                })}
                className="p-2 h-10 rounded border outline-none"
                type="text"
                placeholder={`Enter ${label.toLowerCase()}...`}
              />
              {errors[label.toLowerCase()] && (
                <p className="text-sm font-semibold text-red-500 mt-0">{errors[label.toLowerCase()].message}</p>
              )}
            </div>
          ))}


          {/* Regular Price */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Regular Price</label>
            <div className="flex items-center border rounded">
              <span className="px-3 bg-gray-100 flex items-center justify-center h-10 rounded border-r-0">
                <IndianRupee size={18} />
              </span>
              <input
                defaultValue={'12000'}

                {...register('regularPrice', {
                  required: 'regular price is required'
                })}
                className="flex-1 p-2 h-10 rounded outline-none"
                type="number"
                placeholder="Enter amount"
              />
              {errors.regularPrice && (
                <p className="text-sm font-semibold text-red-500 mt-0">{errors.regularPrice.message}</p>
              )}
            </div>
          </div>

          {/* Offer Price */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Offer Price</label>
            <div className="flex items-center border rounded">
              <span className="px-3 bg-gray-100 flex items-center justify-center h-10 rounded border-r-0">
                <IndianRupee size={18} />
              </span>
              <input
                defaultValue={'10000'}

                {...register('offerPrice', {
                  required: 'Offer Price is required'
                })}
                className="flex-1 p-2 h-10 rounded outline-none"
                type="number"
                placeholder="Enter amount"
              />
              {errors.offerPrice && (
                <p className="text-sm font-semibold text-red-500 mt-0">{errors.offerPrice.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bathrooms, Bedrooms, Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            { label: 'Bathrooms', icon: <BathIcon size={18} /> },
            { label: 'Bedrooms', icon: <Bed size={18} /> },
            { label: 'Size', icon: <Ruler size={18} /> },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="font-semibold text-lg">{field.label}</label>
              <div className="flex items-center border rounded">
                <span className="px-3 bg-gray-100 flex items-center rounded justify-center h-10  border-r-0">
                  {field.icon}
                </span>
                <input
                  {...register(field.label.toLowerCase(), {
                    required: `${field.label.toLowerCase()} is required`,
                  })}
                  className="flex-1 p-2 h-10 rounded outline-none"
                  type="number"
                  placeholder={field.label === 'Size' ? 'In Sqft' : ''}
                />
                {errors[field.label.toLowerCase()] && (
                  <p className="text-sm font-semibold text-red-500 mt-0">{errors[field.label.toLowerCase()].message}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-2">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Furnished', 'Parking Available', 'Special Offer'].map((feat, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input type="checkbox"

                  {...register(feat.toLowerCase())}
                  className="w-4 h-4" />
                <span>{feat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-2">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['WiFi', 'CCTV', 'Lift', 'Security'].map((item, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  {...register("amenities")}
                  className="w-4 h-4"
                />
                <span>{item}</span>
              </label>
            ))}

          </div>
        </div>

        {/* File Upload */}
        <div className="mt-8">
          <label className="block text-lg font-semibold mb-2">Upload Images</label>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100 transition-all duration-200"
              onChange={(e) => handleImageUpload(e)}
            />

            <button
              type="button"
              onClick={handleUploadButtonClick}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all duration-200"
            >
              Upload
            </button>
          </div>
        </div>
        <input type="submit"
          className='bg-gray-800 text-white font-semibold cursor-pointer mt-4 w-full px-5 py-2 rounded hover:bg-gray-700 transition-all duration-200' value={'Submit'} />

      </form>
    </div>

  )
}

export default CreateListing
