import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const IsFavoriteComponent = ({ itemId, favoriteStyle }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(itemId)) {
      setIsFavorited(true);
    }
  }, [itemId]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorited) {
      const updatedFavorites = favorites.filter(fav => fav !== itemId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(itemId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    setIsFavorited(!isFavorited);
  };
  console.log('isFavorited', isFavorited);
  console.log('itemId', itemId);
  console.log('localStorage', localStorage.getItem('favorites'));

  return (
    <span onClick={handleFavoriteClick} className={favoriteStyle}>
      {isFavorited ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
};

export default IsFavoriteComponent;
