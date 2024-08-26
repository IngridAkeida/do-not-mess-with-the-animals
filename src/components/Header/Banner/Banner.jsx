'use client';
import Image from 'next/image';
import { useCombineData } from '../../Main/CombineDatas/CombineDatas';

const Banner = ({randomItem}) => {

  const backgroundImage = randomItem?.backdrop_path
  ? `https://www.doesthedogdie.com/content/1800/0/${randomItem?.backdrop_path}`
  : '/assets/movie-nf.png';

  console.log('randomItem:', randomItem);

  if (!randomItem) {
    return null;
  } 

  // let fetchpath = '';

  // if(randomItem?.media_type === 'movie') {
  //   let fetchpath ='serverDataTMDBMovie';
  // } else if(randomItem?.media_type === 'tv') {
  //   let fetchpath ='serverDataTMDBTvShow';
  // }

  // const { combineData, loading, error } = useCombineData({fetchpath});

  // const item = combineData?.tmdbData;

  // if (loading) {
  //   return <p>Loading...</p>;
  // } 

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // console.log('item:', item);

  return (
    <div 
      className='relative flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    > 
      <div className='absolute inset-0 bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-neutral-a50 opacity-80'></div>

      <div className='relative text-center px-2 mx-2 sm:mx-0 h-52 sm:h-96 flex items-center justify-center gap-4 rounded-b-md text-white'>
        <div className='w-1/2 flex flex-col justify-center items-center gap-y-2'>
          <h1 className='text-center font-bold text-xl pb-2 md:text-5xl bg-gradient-to-br from-dark-menu-y10 via-dark-primary-a0 to-dark-menu-y10 bg-clip-text text-transparent'
          style={{ WebkitTextStroke: '0.1px white' }}>
            Welcome to our page
          </h1>
          <p className='text-base md:text-xl'>
            Explore movies and TV shows with confidence, and know if they&apos;re free from unwanted <span className='text-dark-primary-a0 font-semibold'>triggers</span>.
          </p>
          <p className='text-base md:text-xl'>
            Create an account to save your <span className='text-dark-menu-y10 font-semibold'>favorites</span>, <span className='text-dark-menu-y10 font-semibold'>wish list</span>, <span className='text-dark-menu-y10 font-semibold'>watched</span>, or <span className='text-dark-menu-y10 font-semibold'>unwanted</span> content.
          </p>
          <p className='text-base md:text-xl'>Discover everything about movies and so much more.</p>
        </div>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <div className='absolute mr-4'>
            <Image src={`https://www.doesthedogdie.com/content/1800/0/${randomItem?.backdrop_path}`} alt={randomItem?.title} className='w-full object-contain rounded-md' width={1800} height={1800} />
          </div>
          <div className='relative'>
            {randomItem?.title}
            {/* {randomItem?.release_date} */}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Banner;

