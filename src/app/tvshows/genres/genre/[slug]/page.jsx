'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListTvShow } from '@/pages/api/dataTMDBGenreTvShow';
import Nav from '@/components/Header/Nav/Nav';
import GenreContentCard from '@/components/Main/GenresMenu/GenreContentCard/GenreContentCard';

const GenreTVShow = () => {
  const { slug } = useParams();
  const [genreData, setGenreData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    if(!slug) return;
    const loadAllGenres = async () => {
      try {
        const listGenre = await getListTvShow();
        if (listGenre) {
          setGenreData(listGenre.find(item => item.slug === slug));
        } else {
          setError('Failed to load genres.');
        }
      } catch (e) {
        setError('Failed to load genres.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAllGenres();
  }, [slug]);

  if (!genreData) {
    return <div className='text-white'>Loading genre data...</div>;
  }

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }

  

  

  console.log(genreData)

  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <GenreContentCard genreData={genreData}/>
    </div>
  );
};

export default GenreTVShow;
