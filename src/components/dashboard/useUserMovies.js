// src/hooks/useUserMovies.js
import { useState, useEffect } from 'react';
import { getMyMovies } from '@/services/movies';

export const useUserMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalLikes: 0,
    totalComments: 0,
  });

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getMyMovies();
      if (response.success) {
        const moviesData = response.data || [];
        setMovies(moviesData);

        const totalLikes = moviesData.reduce(
          (sum, movie) => sum + (movie.likes?.length || 0),
          0
        );
        const totalComments = moviesData.reduce(
          (sum, movie) => sum + (movie.comments?.length || 0),
          0
        );

        setStats({
          totalMovies: moviesData.length,
          totalLikes,
          totalComments,
        });
      }
    } catch (error) {
      console.error('❌ Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    stats,
    refetch: fetchMovies,
  };
};