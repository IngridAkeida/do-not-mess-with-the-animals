'use client';
import React, { useEffect, useState } from 'react';
import { getListTvShow } from '../../../pages/api/dataTMDBGenreTvShow';
import Nav from '@/components/Header/Nav/Nav';
import Link from 'next/link';
import GenreIcon from '@/components/uiComponents/GenreIcon/GenreIcon';

const GenresMovie = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllGenres = async () => {
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

  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
        {list.map((genre, index) => (
          <div key={index} className=''>
          <Link href={`/tvshow/genres/genre/${genre.slug}`} passHref> 
            <div 
              className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out' 
            >
              {getGenreIcon(genre.slug)}
              <div className='text-center mt-4'>
                {genre.title}
              </div>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresMovie;
