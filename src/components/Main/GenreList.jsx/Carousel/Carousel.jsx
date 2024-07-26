import Image from "next/image";

const Carousel = ({index, item}) => {
  return (
    <div key={index} className='sm:h-60 sm:w-40 relative'>
      <div className='absolute text-white bg-gradient-to-r  sm:bg-gradient-to-t from-black to-transparent h-[162px] sm:h-60 w-72 sm:w-40 rounded-xl flex flex-col justify-center items-center text-center hover:border'>
        <p className='p-2 sm:hidden'>{item.title || item.name}</p>
        <div>Animal violence?</div>
        <div className='flex gap-2 justify-center items-center text-black'>
          <button className='w-6 bg-blue-50 rounded-md'>1</button>
          <button className='w-6 bg-blue-50 rounded-md'>2</button>
          <button className='w-6 bg-blue-50 rounded-md'>3</button>
        </div>
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