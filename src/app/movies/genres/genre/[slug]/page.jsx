'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getListMovie } from '../../../../../pages/api/dataTMDBGenreMovie';
import Nav from '@/components/Header/Nav/Nav';

const GenreMovie = () => {
  const { slug } = useParams();
  const [genreData, setGenreData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(!slug) return;
    const loadAllGenres = async () => {
      try {
        const listGenre = await getListMovie();
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
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30">
      <Nav />
      <h1 className='text-white'>Genre: {genreData.title}</h1>
      {genreData.items.results.map((movie) => (
        <div key={movie.id} className='text-white'>
          {movie.title}
        </div>
      ))}
    </div>
  );
};

export default GenreMovie;
