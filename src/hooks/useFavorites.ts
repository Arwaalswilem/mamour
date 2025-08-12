import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('lulu-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('lulu-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (projectId: string) => {
    setFavorites(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const isFavorite = (projectId: string) => {
    return favorites.includes(projectId);
  };

  const getFavoriteProjects = () => {
    return favorites;
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteProjects
  };
};