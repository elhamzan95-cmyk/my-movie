import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import CommentSection from '@/components/comments/CommentSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Avatar from '@/components/common/Avatar';
import { FaStar } from 'react-icons/fa';

// Read movies from localStorage
const loadMoviesFromStorage = () => {
  try {
    const raw = localStorage.getItem('movies');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [userInteraction, setUserInteraction] = useState({
    liked: false,
    shared: false,
  });
  const [publisherFollowStatus, setPublisherFollowStatus] = useState({
    isFollowing: false,
    followerCount: 0
  });

  useEffect(() => {
    // Load movie from local storage
    const stored = loadMoviesFromStorage();
    const found = stored.find((m) => (m.id || m._id) === id);
    if (found) {
      setMovie({
        ...found,
        likes: found.likes || [],
        shares: found.shares || [],
        comments: found.comments || []
      });
      setUserInteraction({
        liked: found.userInteraction?.liked || false,
        shared: found.userInteraction?.shared || false,
      });
    } else {
      setError('Movie not found');
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    // Local follow status (mock)
    if (movie?.creator) {
      setPublisherFollowStatus({
        isFollowing: false,
        followerCount: movie.creator.followers?.length || 0
      });
    }
  }, [movie]);

  const formatDate = (dateString) => {
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

  const renderStars = (rating) => {
    if (!rating) return Array(5).fill(<FaStar key={Math.random()} className="text-gray-600" />);
    const stars = [];
    const normalizedRating = Math.max(0, Math.min(10, rating));
    const fullStars = Math.floor(normalizedRating / 2);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-600" />);
      }
    }
    return stars;
  };

  const handleLikeChange = (liked) => {
    if (!movie || !user) return;

    const tempLike = {
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };

    setMovie((prev) => {
      const nextLikes = liked
        ? [...prev.likes, tempLike]
        : prev.likes.filter((like) => (like._id || like.id) !== (user._id || user.id));
      const updated = { ...prev, likes: nextLikes };
      // Persist to localStorage
      const stored = loadMoviesFromStorage();
      const idx = stored.findIndex((m) => (m.id || m._id) === id);
      if (idx !== -1) {
        stored[idx] = { ...stored[idx], likes: nextLikes };
        localStorage.setItem('movies', JSON.stringify(stored));
      }
      return updated;
    });
    setUserInteraction((prev) => ({ ...prev, liked }));
  };

  const handleShareChange = (shared) => {
    if (!movie || !user) return;
    setMovie((prev) => {
      const nextShares = shared
        ? [...prev.shares, { user: user.id, sharedAt: new Date().toISOString() }]
        : prev.shares.filter((share) => share.user !== user.id);
      const updated = { ...prev, shares: nextShares };
      const stored = loadMoviesFromStorage();
      const idx = stored.findIndex((m) => (m.id || m._id) === id);
      if (idx !== -1) {
        stored[idx] = { ...stored[idx], shares: nextShares };
        localStorage.setItem('movies', JSON.stringify(stored));
      }
      return updated;
    });
    setUserInteraction((prev) => ({ ...prev, shared }));
  };

  if (loading) return <LoadingSpinner />;
  if (error || !movie) return <NotFoundMessage />;

  const isOwner = user && movie.creator && (user.id === (movie.creator.id || movie.creator._id));

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-400 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/movies" className="hover:text-orange-400 transition">Movies</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-400 font-bold">{movie.title}</span>
          </nav>
        </div>

        <div className="lg:hidden mb-6 flex justify-center">
          <div className="max-w-full rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <img
              src={movie.image || 'https://via.placeholder.com/400x400?text=Film+Memories'}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/400x400?text=Film+Memories')}
            />
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-2xl p-8 mb-8 shadow-lg border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block lg:w-1/3">
              <div className="aspect-square rounded-xl overflow-hidden shadow-xl border border-gray-700">
                <img
                  src={movie.image || 'https://via.placeholder.com/400x400?text=Film+Memories'}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/400x400?text=Film+Memories')}
                />
              </div>
            </div>

            <div className="lg:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                  {isOwner && (
                    <button
                      onClick={() => navigate(`/edit-movie/${id}`)}
                      className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition text-sm border border-orange-500/30"
                    >
                      Edit
                    </button>
                  )}
                </div>

                <div className="mb-6">
                  <div className="bg-[#374151] px-5 py-3 rounded-full shadow-sm mb-3">
                    <span className="text-white">Release Year: {movie.year || 'Unknown'}</span>
                  </div>
                  <div className="bg-[#374151] px-5 py-3 rounded-full shadow-sm mb-3">
                    <span className="text-white">Genre: {getGenreLabel(movie.genre)}</span>
                  </div>
                  <div className="bg-[#374151] px-5 py-3 rounded-full shadow-sm">
                    <span className="text-white">Director: {movie.director || 'Unknown'}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4 gap-1">{renderStars(movie.rating || 0)}</div>
                    <span className="text-2xl font-bold text-white">
                      {movie.rating || 0}
                      <span className="text-lg text-gray-400">/10</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between p-6 bg-[#374151] rounded-xl">
                  {movie.creator && (
                    <Link to={`/profile/${movie.creator._id || movie.creator.id}`} className="flex items-center hover:opacity-80 transition">
                      <Avatar user={movie.creator} size="lg" />
                      <div className="ml-4">
                        <p className="font-bold text-white">{movie.creator.name || 'User'}</p>
                        <p className="text-sm text-gray-300">Published on {formatDate(movie.createdAt)}</p>
                      </div>
                    </Link>
                  )}
                  {!isOwner && user && (movie.creator?._id || movie.creator?.id) && (
                    <FollowButton
                      userId={movie.creator._id || movie.creator.id}
                      initialIsFollowing={publisherFollowStatus.isFollowing}
                      initialFollowerCount={publisherFollowStatus.followerCount}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-700">
            <div className="flex space-x-8">
              {['details', 'comments', 'likes'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {getTabTitle(tab, movie)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'details' && <MovieDetails movie={movie} />}
            {activeTab === 'comments' && <CommentSection movieId={id} />}
            {activeTab === 'likes' && <LikesTab likes={movie.likes} />}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-orange-500/30 hover:border-orange-500/50 transition">
              <h3 className="font-bold mb-4 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                Actions
              </h3>
              <div className="space-y-3">
                <LikeButton
                  movieId={id}
                  initialLikes={movie.likes || []}
                  initialLiked={userInteraction.liked}
                  showCount={true}
                  size="lg"
                  onLikeChange={handleLikeChange}
                />
                <ShareButton
                  movieId={id}
                  movieTitle={movie.title}
                  initialShared={userInteraction.shared}
                  initialShareCount={movie.shares?.length || 0}
                  onShareChange={handleShareChange}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotFoundMessage = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#171717] text-white">
    <div className="text-center">
      <div className="text-6xl mb-4">🎬</div>
      <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
      <Link to="/movies" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
        Back to Movies
      </Link>
    </div>
  </div>
);

const MovieDetails = ({ movie }) => (
  <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-gray-700">
    <h2 className="text-xl font-bold mb-6 text-white">Movie Memory</h2>
    <div className="prose prose-lg max-w-none text-gray-300">
      <p className="leading-relaxed whitespace-pre-line">
        {movie.description || 'No description has been added for this movie.'}
      </p>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.likes?.length || 0}</div>
          <div className="text-sm text-gray-300">Likes</div>
        </div>
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.comments?.length || 0}</div>
          <div className="text-sm text-gray-300">Comments</div>
        </div>
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.shares?.length || 0}</div>
          <div className="text-sm text-gray-300">Shares</div>
        </div>
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.rating || 0}/10</div>
          <div className="text-sm text-gray-300">Rating</div>
        </div>
      </div>
    </div>
  </div>
);

const LikesTab = ({ likes }) => (
  <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-gray-700">
    <h2 className="text-xl font-bold mb-6 text-white">People who like this movie</h2>
    {likes && likes.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {likes.map((like, index) => (
          <Link
            key={like._id || index}
            to={`/profile/${like._id}`}
            className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-[#374151] transition"
          >
            <Avatar user={like} size="md" />
            <div className="ml-4">
              <p className="font-bold text-white">{like.name || `User ${index + 1}`}</p>
              <p className="text-sm text-gray-400">Liked</p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">❤️</div>
        <h3 className="text-xl font-bold mb-2 text-white">No one has liked this movie yet</h3>
        <p className="text-gray-400">Be the first to like this movie</p>
      </div>
    )}
  </div>
);

const getGenreLabel = (genre) => {
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
  };
  return genreMap[genre] || genre || 'Other';
};

const getTabTitle = (tab, movie) => {
  const titles = {
    details: 'Details',
    comments: `Comments (${movie.comments?.length || 0})`,
    likes: `Likes (${movie.likes?.length || 0})`,
  };
  return titles[tab] || tab;
};

export default MovieDetailPage;