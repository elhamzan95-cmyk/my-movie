import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMovieById, updateMovie } from '../services/movies';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Alert from '../components/common/Alert';
import FormInput from '../components/common/FormInput';
import FormSelect from '../components/common/FormSelect';
import FormTextarea from '../components/common/FormTextarea';
import ImageUploader from '../components/movie/ImageUploader';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { GENRES, YEARS } from '../constants/movie';

const EditMoviePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    director: '',
    genre: '',
    rating: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await getMovieById(id);

        if (response.success) {
          const movie = response.data;
          const creatorId = movie.creator?.id || movie.creator?._id;
          if (creatorId !== user.id && user.role !== 'admin') {
            alert('You are not allowed to edit this movie');
            navigate('/movies');
            return;
          }

          setFormData({
            title: movie.title || '',
            description: movie.description || '',
            year: movie.year || new Date().getFullYear(),
            director: movie.director || '',
            genre: movie.genre || '',
            rating: movie.rating || ''
          });

          setCurrentImage(movie.image || '');
          setImagePreview(movie.image || '');
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        console.error('Failed to fetch movie:', err);
        setError('Error loading movie data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id, user, navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  }, []);

  const handleImageChange = useCallback((file) => {
    setImageFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Movie title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.description.length < 10) {
      setError('Description must be at least 10 characters');
      return false;
    }
    if (!formData.year) {
      setError('Release year is required');
      return false;
    }
    if (!formData.director.trim()) {
      setError('Director name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('director', formData.director);
      formDataToSend.append('genre', formData.genre);
      if (formData.rating) formDataToSend.append('rating', formData.rating);
      if (imageFile) formDataToSend.append('image', imageFile);

      const response = await updateMovie(id, formDataToSend);

      if (response.success) {
        setSuccess('Movie updated successfully!');
        setTimeout(() => navigate(`/movies/${id}`), 2000);
      } else {
        setError(response.message || 'Error updating movie');
      }
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message || 'Error updating movie. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Movie</h1>
          <p className="text-gray-200">Edit the movie information</p>
        </div>

        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <form onSubmit={handleSubmit} className="space-y-8">
            <ImageUploader
              imageFile={imageFile}
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              currentImage={currentImage}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Movie Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Interstellar"
                required
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
                labelClassName="text-gray-200"
              />

              <FormInput
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                placeholder="e.g. Christopher Nolan"
                required
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
                labelClassName="text-gray-200"
              />

              <FormSelect
                label="Release Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                options={YEARS.map(y => ({ value: y, label: y }))}
                required
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white focus:ring-orange-500"
                labelClassName="text-gray-200"
              />

              <FormSelect
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                options={GENRES}
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white focus:ring-orange-500"
                labelClassName="text-gray-200"
              />
            </div>

            <FormTextarea
              label="Description and Your Memory"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the memory this movie created for you..."
              maxLength={1000}
              required
              disabled={isSubmitting}
              className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
              labelClassName="text-gray-200"
            />

            <div>
              <label className="block text-gray-200 mb-2">Your Rating (optional)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="rating"
                  min="0"
                  max="10"
                  step="0.5"
                  value={formData.rating || 0}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="ml-4 min-w-[40px] font-bold text-white">
                  {formData.rating || 0}/10
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    <FaSave />
                    Save Changes
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/movies/${id}`)}
                disabled={isSubmitting}
                className="px-8 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>

              <button
                type="button"
                onClick={() => navigate('/movies')}
                className="px-8 py-3 border border-red-700 text-red-200 rounded-lg hover:bg-red-900/30 transition flex items-center justify-center gap-2"
              >
                <FaArrowLeft />
                Back to Movies
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMoviePage;