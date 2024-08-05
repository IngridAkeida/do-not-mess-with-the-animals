import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";


const Carousel = ({index, item}) => {

  return (
    <div key={index} className='sm:h-60 sm:w-40 relative pr-2 sm:cursor-pointer'>
      <div className='absolute text-left text-white bg-gradient-to-r  sm:bg-gradient-to-t from-black hover:from-transparent to-transparent h-[158px] sm:h-[230px] w-52 sm:w-[152px] rounded-xl flex flex-col justify-center sm:justify-end items-start sm:text-center sm:pb-4 border'>
      <div className='px-2'>
        <p className='sm:hidden font-bold pb-1'>{item.title || item.name}</p>
        <p className='text-sm'>{item.release_date}</p>
        <p className='text-sm'>Trigger</p> 
        <p className='text-sm'>yes X no</p>
        <p className='text-sm'><FaCheck /><FaPlus/><FaRegHeart /><FaHeart /><FaPlay/></p>
      </div>
      </div>
      <div className='hidden sm:flex'>
        {item.poster_path=== null ? (
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
}

export default Carousel;