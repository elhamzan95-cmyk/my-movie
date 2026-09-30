import { useState, useRef } from 'react';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/utils/constants';

export const useImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateImage = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('Only image files (JPG, PNG, GIF, WebP) are allowed');
      return false;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError('File size must not exceed 10MB');
      return false;
    }
    return true;
  };

  // Directly set file (suited for ImageUploader)
  const setImage = (file) => {
    if (!file) return;
    if (!validateImage(file)) return;
    setImageFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Event-compatible handler (for input type file)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const resetImage = () => {
    setImageFile(null);
    setImagePreview('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return {
    imageFile,
    imagePreview,
    imageError: error,
    fileInputRef,
    handleImageChange,  // for use with <input onChange={handleImageChange}>
    setImage,           // for direct file use
    triggerFileInput,
    resetImage,
  };
};