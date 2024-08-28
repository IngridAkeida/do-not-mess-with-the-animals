'use client';
import Image from 'next/image';
import Link from 'next/link';

const Banner = ({randomItem, matchFound}) => {

  const imagePath = randomItem?.backgroundImage || randomItem?.backdrop_path;
  const backgroundImage = imagePath 
    ? `https://www.doesthedogdie.com/content/1800/0/${imagePath}` 
    : '/assets/movie-nf.png';

  console.log('randomItem:', randomItem);

  if (!randomItem) {
    return null;
  } 

  console.log('matchFound:', matchFound);

  let resultType = '';

  if (matchFound.media_type === 16) {
    resultType = 'tvshow';
  } else {
    resultType = 'movie';
  }


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
            Explore movies and TV shows with confidence, and know if they&apos;re free from unwanted <span className='text-dark-primary-a0 font-semibold bg-dark-menu-y10 py-0.5 px-1 rounded-md'>triggers</span>.
          </p>
          <p className='text-base md:text-xl'>
            Create an account to save your <span className='text-dark-menu-y10 font-semibold'>favorites</span>, <span className='text-dark-menu-y10 font-semibold'>wish list</span>, <span className='text-dark-menu-y10 font-semibold'>watched</span>, or <span className='text-dark-menu-y10 font-semibold'>unwanted</span> content.
          </p>
          <p className='text-base md:text-xl'>Discover everything about movies and so much more.</p>
        </div>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <div className='absolute mr-4'>
            <Image src={`https://www.doesthedogdie.com/content/1800/0/${randomItem?.backdrop_path}`} alt={randomItem?.name} className='w-full object-contain rounded-md' width={1800} height={1800} />
          </div>
          <div className='relative w-auto bg-dark-primary-a40 rounded-md py-5 px-10 bg-opacity-35'>
            <div className='text-lg font-semibold '>{randomItem?.name}</div>
            <Link href={`/${resultType}/${matchFound.id}`}>Aqui</Link>
            {/* {randomItem?.release_date} */}
          </div>
          
        </div>
      </div>
    </div>

  );
};

export default Banner;

