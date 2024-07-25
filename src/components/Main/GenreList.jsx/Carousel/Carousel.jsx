import Image from "next/image";

const Carousel = ({index, item}) => {
  return (
    <div key={index} className='h-60 w-40 relative'>
      <div className='absolute text-white bg-gradient-to-t from-black to-transparent h-60 w-40 rounded-full flex flex-col justify-center items-center text-center'>
        <p className=''>{item.title || item.name}</p>
      </div>
      <Image src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} width={300} height={450} alt={item.title} className='rounded-full'/>  
    </div>
  );
}

export default Carousel;