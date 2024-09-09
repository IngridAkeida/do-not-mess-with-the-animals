'use client';
import { useEffect, useState } from 'react';
import { getListTvShow } from '../../../pages/api/dataTMDBGenreTvShow';
import Nav from '@/components/Header/Nav/Nav';
import GenreIcon from '@/components/uiComponents/GenreIcon/GenreIcon';
import GenreMenu from '@/components/Main/GenresMenu/GenreMenu';
import Footer from '@/components/Footer/Footer';

const GenresTVShow = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllGenres = async () => {
      setLoading(true);
      try {
        const listGenres = await getListTvShow();
        if (listGenres) {
          setList(listGenres);
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

  const getGenreIcon = GenreIcon;
  const content = 'tvshows';

  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <GenreMenu list={list} content={content} getGenreIcon={getGenreIcon} />
      <Footer />
    </div>
  );
};

export default GenresTVShow;
