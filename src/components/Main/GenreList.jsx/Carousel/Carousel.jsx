import Image from "next/image";

const Carousel = ({index, item}) => {
  return (
    <div key={index} className='sm:h-60 sm:w-40 relative pr-2 sm:cursor-pointer'>
      <div className='absolute text-white bg-gradient-to-r  sm:bg-gradient-to-t from-black hover:from-transparent to-transparent h-[158px] sm:h-[230px] w-52 sm:w-[152px] rounded-xl flex flex-col justify-center sm:justify-end items-center text-center sm:pb-4'>
        <p className='p-2 '>{item.title || item.name}</p>
      </div>
      <div className='hidden sm:flex'>
        <Image src={`https://image.tmdb.org/t/p//w300${item.poster_path}`} width={300} height={450} alt={item.title} className='rounded-xl'/>  
      </div>
      <div className='sm:hidden flex'>
        <Image src={`https://image.tmdb.org/t/p//w400${item.backdrop_path}`} width={400} height={300} alt={item.title} className='rounded-xl'/>  
      </div>
    </div>
  );
}

export default Carousel;