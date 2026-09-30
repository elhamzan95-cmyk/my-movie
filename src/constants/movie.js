export const GENRES = [
  { value: '', label: 'Select Genre' },
  { value: 'action', label: 'Action' },
  { value: 'drama', label: 'Drama' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'horror', label: 'Horror' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'animation', label: 'Animation' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'crime', label: 'Crime' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'biography', label: 'Biography' },
  { value: 'history', label: 'History' },
  { value: 'war', label: 'War' },
  { value: 'musical', label: 'Musical' },
  { value: 'family', label: 'Family' },
  { value: 'other', label: 'Other' }
];

export const YEARS = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);