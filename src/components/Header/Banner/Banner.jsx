'use client';
import SearchField from '../../uiComponents/SearchField/SearchField'; 
import GuardianNews from '../../../pages/api/theGuardianAPI';
import Image from 'next/image';

const Banner = ({randomItem}) => {
  const SearchWrapStyle = 'text-base sm:text-2xl relative m-2';
  const SearchInputStyle = 'p-2 pl-6 sm:w-[600px] lg:w-[800px] bg-light-neutral-200 rounded-3xl text-black outline-none';
  const SearchButtonStyle = 'p-3 pl-8 bg-gradient-to-l from-dark-menu-y10 to-alert-warning-100 hover:bg-dark-menu-y10 rounded-r-3xl absolute right-0 text-dark-neutral-a40';
  const SearchButtonDisabledStyle = 'bg-gray-300 text-gray-500 cursor-none';

  const backgroundImage = randomItem?.backdrop_path
  ? `https://www.doesthedogdie.com/content/1800/0/${randomItem?.backdrop_path}`
  : '/assets/movie-nf.png';

  console.log('randomItem:', randomItem);

  return (
    <div 
      className='relative flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    > 
      <div className='absolute inset-0 bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-neutral-a50 opacity-80'></div>
      
      <div className='relative text-center px-2 mx-2 sm:mx-0 h-52 sm:h-96 flex items-center justify-center gap-4 sm:px-10 rounded-b-md text-white'>
        <div className='w-1/2 flex flex-col gap-y-2'>
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
        <div className='w-1/2 h-full'>
          <Image src={`https://www.doesthedogdie.com/content/1800/0/${randomItem?.backdrop_path}`} alt={randomItem?.title} className='h-full w-full object-cover rounded-md' width={1800} height={1800} />
        </div>
      </div>
    </div>

  );
};

export default Banner;

