'use client';
import { useEffect, useState } from 'react';
import { getListMovie } from '../../../pages/api/dataTMDBGenreMovie';
import Nav from '@/components/Header/Nav/Nav';

const GenresMovie = () => {

  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const listGenres = await getListMovie();
        if (listGenres) {
          setList(listGenres);
          console.log(listGenres);
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
  }, []);
  

    if (loading) {
      return <div className='text-white'>Loading...</div>;
    }
  
    if (error) {
      return <div className='text-white'>Error: {error}</div>;
    }



    return (
      <div className='max-w-7xl mx-auto h-96'>
        <Nav />
        {list.map((genre, index) => (
          <div key={index} className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 rounded-md md:flex'>
          <h1>{genre.title}</h1>
          </div>
        ))}
    </div>
  );
}

export default GenresMovie;