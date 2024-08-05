import Image from 'next/image';
import { useState } from 'react';
import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';

const Carousel = ({ index, item }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div key={index} className='sm:h-60 sm:w-40 relative pr-2 sm:cursor-pointer'>
      <div className='absolute text-left text-white bg-gradient-to-r sm:bg-gradient-to-t from-black sm:hover:from-black sm:from-transparent to-transparent h-[100%] w-[100%] rounded-xl flex flex-col justify-center sm:justify-end items-start sm:text-center sm:pb-4'>
        <div className='block sm:text-transparent sm:hover:text-white px-2 h-[80%] w-[100%]'>
          <p className='font-bold'>{item.title || item.name}</p>
          <p className='text-xs pb-1'>{item.release_date}</p>
          <p className='text-xs'>genre,genre, genre</p>
          <p className='text-sm'>Trigger</p> 
          <p className='text-sm'>yes X no</p>
          <div className='border text-sm flex  gap-2 sm:absolute sm:bottom-4 sm:left-12'>
            <span onClick={handleAddClick} className='cursor-pointer'>
              {isAdded ? <FaCheck /> : <FaPlus />}
            </span>
            <span onClick={handleFavoriteClick} className='cursor-pointer'>
              {isFavorited ? <FaHeart /> : <FaRegHeart />}
            </span>
            <FaPlay />
          </div>
        </div>
      </div>
      <div className='hidden sm:flex'>
        {item.poster_path === null ? (
          <Image className='rounded-xl' src='/assets/movie-nf.png' width={300} height={300} alt={item.title} />
        ) : (
          <Image src={`https://image.tmdb.org/t/p//w300${item.poster_path}`} width={300} height={450} alt={item.title} className='rounded-xl'/>  
        )}
      </div>
      <div className='sm:hidden flex'>
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
