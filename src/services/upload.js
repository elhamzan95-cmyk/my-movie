// src/services/upload.js
import api from './api';

// Upload image to Cloudinary
export const uploadImage = async (file) => {
  try {
    console.log('📤 Starting image upload:', file.name);

    const formData = new FormData();
    formData.append('image', file);

    // Test upload (using the test route available in the backend)
    const response = await api.post('/movies/upload-test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('✅ Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Image upload error:', error);
    throw error;
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    // Note: this requires a dedicated API endpoint in the backend
    const response = await api.delete(`/upload/${publicId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Image delete error:', error);
    throw error;
  }
};