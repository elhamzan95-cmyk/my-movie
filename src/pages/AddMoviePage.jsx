import { useNavigate } from 'react-router-dom';
import { useMovieForm } from '@/hooks/useMovieForm';
import { useImageUpload } from '@/hooks/useImageUpload';
import ImageUploader from '@/components/common/ImageUploader';
import FormInput from '@/components/common/FormInput';
import FormSelect from '@/components/common/FormSelect';
import FormTextarea from '@/components/common/FormTextarea';
import ProgressBar from '@/components/common/ProgressBar';
import Alert from '@/components/common/Alert';
import { FaSave, FaTimes } from 'react-icons/fa';
import { GENRE_OPTIONS, YEARS } from '@/utils/constants';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const {
    formData,
    isLoading,
    error,
    uploadProgress,
    handleInputChange,
    handleSubmit: submitForm,
  } = useMovieForm();

  const { imageFile, imagePreview, imageError, setImage, resetImage } = useImageUpload();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image for the movie');
      return;
    }
    await submitForm(imageFile);
    resetImage();
  };

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Movie</h1>
          <p className="text-gray-200">Share your movie memory with our community</p>
        </div>

        {/* Form */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          <Alert type="error" message={error || imageError} />

          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Image upload section */}
            <ImageUploader
              imageFile={imageFile}
              imagePreview={imagePreview}
              onImageChange={setImage}
              currentImage={null}
            />

            {/* Movie info fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Movie Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Interstellar"
                required
                disabled={isLoading}
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
                disabled={isLoading}
                className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
                labelClassName="text-gray-200"
              />
              <FormSelect
                label="Release Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                options={YEARS.map((y) => ({ value: y, label: y }))}
                required
                disabled={isLoading}
                className="bg-[#374151] border-gray-600 text-white focus:ring-orange-500"
                labelClassName="text-gray-200"
              />
              <FormSelect
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                options={GENRE_OPTIONS}
                disabled={isLoading}
                className="bg-[#374151] border-gray-600 text-white focus:ring-orange-500"
                labelClassName="text-gray-200"
              />
            </div>

            {/* Description */}
            <FormTextarea
              label="Description and Your Memory"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the memory this movie created for you..."
              maxLength={1000}
              required
              disabled={isLoading}
              className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
              labelClassName="text-gray-200"
            />

            {/* Rating slider */}
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
                  disabled={isLoading}
                />
                <span className="ml-4 min-w-[40px] font-bold text-white">
                  {formData.rating || 0}/10
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <ProgressBar progress={uploadProgress} />

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
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
                    {uploadProgress === 100 ? 'Saving...' : 'Uploading...'}
                  </span>
                ) : (
                  <>
                    <FaSave />
                    Add Movie
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/movies')}
                disabled={isLoading}
                className="px-8 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMoviePage;