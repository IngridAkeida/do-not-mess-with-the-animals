'use client';
import React, { useEffect, useState } from 'react';
import { getListMovie } from '../../../pages/api/dataTMDBGenreMovie';
import Nav from '@/components/Header/Nav/Nav';
import { MdTheaters } from 'react-icons/md';
import { FaTheaterMasks, FaRobot, FaSkull, FaLaugh, FaHeart, FaDragon, FaTv, FaMusic, FaHistory, FaFilm } from 'react-icons/fa';
import { GiWesternHat, GiFamilyHouse, GiSwordman, GiWarAxe } from 'react-icons/gi';
import { MdAnimation } from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';
import { RiPoliceCarFill } from "react-icons/ri";
import { FaSurprise } from "react-icons/fa";
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
      'action': <GiSwordman className="h-20 w-20 text-white" />,
      'adventure': <IoIosRocket className="h-20 w-20 text-white" />,
      'animation':  <MdAnimation className="h-20 w-20 text-white" />,
      'comedy': <FaLaugh className="h-20 w-20 text-white" />,
      'crime': <RiPoliceCarFill className="h-20 w-20 text-white" />,
      'documentary': <FaTv className="h-20 w-20 text-white" />,
      'drama': <FaTheaterMasks className="h-20 w-20 text-white" />,
      'family': <GiFamilyHouse className="h-20 w-20 text-white" />,
      'fantasy': <FaDragon className="h-20 w-20 text-white" />,
      'history': <FaHistory className="h-20 w-20 text-white" />,
      'horror': <FaSkull className="h-20 w-20 text-white" />,
      'music': <FaMusic className="h-20 w-20 text-white" />,
      'mystery': <GiWesternHat className="h-20 w-20 text-white" />,
      'romance': <FaHeart className="h-20 w-20 text-white" />,
      'scifi': <FaRobot className="h-20 w-20 text-white" />,
      'tv-movie': <FaTv className="h-20 w-20 text-white" />,
      'thriller': <FaSurprise  className="h-20 w-20 text-white" />,
      'war': <GiWarAxe className="h-20 w-20 text-white" />,
      'western': <GiWesternHat className="h-20 w-20 text-white" />,
    };

    return icons[slug] || <MdTheaters className="h-20 w-20 text-white" />;
  };

  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4'>
        {list.map((genre, index) => (
          <div key={index} className=''>
          <Link href={`/movies/genres/genre/${genre.slug}`} passHref> 
            <div 
              className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30  transition duration-300 cursor-pointer'
            >
              {getGenreIcon(genre.slug)}
              <div className='text-white text-center mt-4'>
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
