'use client';
import React, { useEffect, useState } from 'react';
import { getListMovie } from '../../../pages/api/dataTMDBGenreMovie';
import GenreIcon from '@/components/uiComponents/GenreIcon/GenreIcon';
import GenreMenu from '@/components/Main/GenresMenu/GenreMenu';
import Layout from '@/components/uiComponents/LayoutContainer/LayoutContainer';

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
  const content = 'movies';

  return (
    <Layout>
      <GenreMenu list={list} content={content} getGenreIcon={getGenreIcon} />
    </Layout>
  );
};

export default GenresMovie;
