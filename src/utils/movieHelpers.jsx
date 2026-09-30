// Helper functions for movie pages

export const getGenre = (genre) => {
  const genreMap = {
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
    other: 'Other'
  };
  return genreMap[genre] || genre || 'Other';
};

export const getTabTitle = (tab, movie) => {
  const titles = {
    details: 'Details',
    comments: `Comments (${movie.comments?.length || 0})`,
    likes: `Likes (${movie.likes?.length || 0})`,
    shares: `Shares (${movie.shares?.length || 0})`
  };
  return titles[tab] || tab;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const renderStars = (rating) => {
  if (!rating) return Array(5).fill(<span key={Math.random()} className="text-gray-300">★</span>);
  const stars = [];
  const normalizedRating = Math.max(0, Math.min(10, rating));
  const fullStars = Math.floor(normalizedRating / 2);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="text-yellow-500">★</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
  }
  return stars;
};