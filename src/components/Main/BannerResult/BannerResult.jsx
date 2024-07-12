import Image from "next/image";

const BannerResult = ({item}) => {
  const backgroundImage = item.backgroundImage
  ? `https://www.doesthedogdie.com/content/1800/0/${item.backgroundImage}`
  : '/assets/movie-nf.png';

  const stylesPoster ='w-32 md:w-20 max-h-96 object-contain rounded-md shadow-md';

  return (
    <div className={`flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='flex p-4'>
          {item.posterImage === null ? (
              <Image className={stylesPoster} src='/assets/movie-nf.png' width={300} height={300} alt={item.name} />
            ) : (
              <Image className={stylesPoster} src={`https://www.doesthedogdie.com/content/200/0/${item.posterImage}`} width={300} height={300} alt={item.name} />
            )}
            <div className='pl-4'>
              <h1 className='py-1 font-bold'>{item.name}</h1>
              <p>{item.releaseYear}</p>
              <p>genre</p>
              <p>direct by: sjjsjs</p>
              <p>Written by: sjjsjs</p> 
            </div>
          </div>
          <p className='font-semibold bg-gradient-to-t from-black to-transparent px-4 pb-4'>{item.overview}</p>
        </div>
  );
}

export default BannerResult;