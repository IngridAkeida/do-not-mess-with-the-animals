'use client';
import { useEffect, useState } from 'react';
import { getListTvShow } from '../../../pages/api/dataTMDBGenreTvShow';
import GenreIcon from '@/components/uiComponents/GenreIcon/GenreIcon';
import GenreMenu from '@/components/Main/GenresMenu/GenreMenu';
import Layout from '@/components/uiComponents/ConainerLayout/ContainerLayout';

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
    <Layout>
      <GenreMenu list={list} content={content} getGenreIcon={getGenreIcon} />
    </Layout>
  );
};

export default GenresTVShow;
