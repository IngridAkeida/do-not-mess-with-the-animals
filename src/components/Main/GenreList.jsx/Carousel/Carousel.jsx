import Image from "next/image";

const Carousel = ({index, item}) => {
  return (
    <div key={index} className='border border-black w-40'>
      <p>{item.title || item.name}</p>
      <Image src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} width={300} height={450} alt={item.title} />
    </div>
  );
}

export default Carousel;