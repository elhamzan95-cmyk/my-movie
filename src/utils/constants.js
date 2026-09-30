// src/utils/constants.js
export const GENRE_MAP = {
  action: 'Action',
  drama: 'Drama',
  comedy: 'Comedy',
  'sci-fi': 'Sci-Fi',
  horror: 'Horror',
  romance: 'Romance',
  thriller: 'Thriller',
  documentary: 'Documentary',
  animation: 'Animation',
  fantasy: 'Fantasy',
  adventure: 'Adventure',
  crime: 'Crime',
  mystery: 'Mystery',
  biography: 'Biography',
  history: 'History',
  war: 'War',
  musical: 'Musical',
  family: 'Family',
  other: 'Other',
};

export const GENRE_OPTIONS = [
  { value: '', label: 'Select Genre' },
  ...Object.entries(GENRE_MAP).map(([value, label]) => ({ value, label })),
];

export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'rating', label: 'Highest Rated' },
];

// Upload limitations
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];