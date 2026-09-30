// src/components/common/ImageUploader.jsx
import React, { useRef } from 'react';
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ImageUploader = ({ imageFile, imagePreview, onImageChange, currentImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Only images in JPG, PNG, GIF, or WebP format are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must not exceed 5MB.');
      return;
    }

    onImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-200 font-bold mb-2">Movie Image</label>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {/* Clickable image area */}
          <div
            onClick={handleClick}
            className="relative cursor-pointer inline-block"
          >
            {imagePreview || currentImage ? (
              <img
                src={imagePreview || currentImage}
                alt="Movie"
                className="w-48 h-48 object-cover rounded-lg border border-gray-600"
              />
            ) : (
              <div className="w-48 h-48 bg-[#374151] rounded-lg border border-gray-600 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
          {imageFile && (
            <p className="text-sm text-gray-400 mt-2">New image selected</p>
          )}
          {!imageFile && currentImage && (
            <p className="text-sm text-gray-400 mt-2">Click the image to change it</p>
          )}
        </div>

        <div className="md:w-1/2">
          <div className="bg-[#2A2A2A] rounded-lg p-6 border border-gray-700">
            <h3 className="font-bold mb-4 text-gray-200 flex items-center gap-2">
              <FaInfoCircle className="text-orange-400" />
              Image Guidelines
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Click the image to upload a new one
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                High-quality images have more impact
              </li>
              <li className="flex items-center gap-2">
                <FaTimesCircle className="text-red-500" />
                Do not use unrelated images
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;