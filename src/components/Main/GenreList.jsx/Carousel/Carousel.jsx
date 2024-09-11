import Image from 'next/image';
import { useState } from 'react';
import {FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import IsFavoriteComponent from '@/components/uiComponents/IsFavorite/IsFavorite';

const Carousel = ({ index, item }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };

  return (
      <div key={index} className='sm:h-auto relative pr-2 sm:cursor-pointer'>
        <div className='absolute text-left bg-gradient-to-r sm:bg-gradient-to-t from-black to-transparent md:from-transparent md:hover:bg-black md:hover:opacity-80  h-[100%] sm:h-[100%] w-72 xs:w-64 sm:w-28 xl:w-32 rounded-xl flex flex-col justify-center sm:justify-end items-start sm:text-center'>
          <div className='block md:text-transparent md:hover:text-white px-2 h-[80%] md:h-[100%] w-[100%] md:pt-8'>
            <p className='font-bold text-sm'>{item.title || item.name}</p>
            <p className='text-xs pb-1'>{item.release_date}</p>
            <p className='text-xs'>genre,genre, genre</p>
            <p className='text-sm'>Trigger</p> 
            <p className='text-sm'>yes X no</p>
            <div className='text-sm flex gap-2 sm:absolute sm:bottom-2 sm:left-10'>
              <span onClick={handleAddClick} className='cursor-pointer'>
                {isAdded ? <FaCheck /> : <FaPlus />}
              </span>
              <IsFavoriteComponent itemId={item.id} />
              <FaPlay />
            </div>
          </div>
        </div>
        <div className='hidden sm:flex w-48 sm:w-28 xl:w-32'>
          {item.poster_path === null ? (
            <Image className='rounded-xl' src='/assets/movie-nf.png' width={300} height={300} alt={item.title} />
          ) : (
            <Image src={`https://image.tmdb.org/t/p//w300${item.poster_path}`} width={300} height={450} alt={item.title} className='rounded-xl'/>  
          )}
        </div>
        <div className='sm:hidden flex w-72 xs:w-64'>
          {item.backdrop_path === null ? (
            <Image className='rounded-xl' src='/assets/movie-nf-hor.png' width={300} height={300} alt={item.title} />
          ) : (
            <Image src={`https://image.tmdb.org/t/p//w400${item.backdrop_path}`} width={400} height={300} alt={item.title} className='rounded-xl'/> 
          )}
        </div>
      </div>
  );
};

export default Carousel;
