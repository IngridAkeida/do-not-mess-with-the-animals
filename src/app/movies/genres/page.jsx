'use client';
import React, { useEffect, useState } from 'react';
import { getListMovie } from '../../../pages/api/dataTMDBGenreMovie';
import Nav from '@/components/Header/Nav/Nav';
import { MdTheaters } from 'react-icons/md';
import { FaTheaterMasks, FaRobot, FaSkull, FaLaugh, FaHeart, FaDragon, FaTv, FaMusic, FaHistory, FaFilm } from 'react-icons/fa';
import { GiWesternHat, GiFamilyHouse, GiSwordman, GiWarAxe } from 'react-icons/gi';
import { MdAnimation } from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';
import { RiPoliceCarFill } from 'react-icons/ri';
import { FaSurprise } from 'react-icons/fa';
import Link from 'next/link';

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

  const getGenreIcon = (slug) => {
    const icons = {
      'action': <GiSwordman className='h-20 w-20' />,
      'adventure': <IoIosRocket className='h-20 w-20' />,
      'animation':  <MdAnimation className='h-20 w-20' />,
      'comedy': <FaLaugh className='h-20 w-20' />,
      'crime': <RiPoliceCarFill className='h-20 w-20' />,
      'documentary': <FaTv className='h-20 w-20' />,
      'drama': <FaTheaterMasks className='h-20 w-20' />,
      'family': <GiFamilyHouse className='h-20 w-20' />,
      'fantasy': <FaDragon className='h-20 w-20' />,
      'history': <FaHistory className='h-20 w-20' />,
      'horror': <FaSkull className='h-20 w-20' />,
      'music': <FaMusic className='h-20 w-20' />,
      'mystery': <GiWesternHat className='h-20 w-20' />,
      'romance': <FaHeart className='h-20 w-20' />,
      'scifi': <FaRobot className='h-20 w-20' />,
      'tv-movie': <FaTv className='h-20 w-20' />,
      'thriller': <FaSurprise  className='h-20 w-20' />,
      'war': <GiWarAxe className='h-20 w-20' />,
      'western': <GiWesternHat className='h-20 w-20' />,
    };

    return icons[slug] || <MdTheaters className='h-20 w-20' />;
  };

  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30 '>
      <Nav />
      <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
        {list.map((genre, index) => (
          <div key={index} className=''>
          <Link href={`/movies/genres/genre/${genre.slug}`} passHref> 
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
