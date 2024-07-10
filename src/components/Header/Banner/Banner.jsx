'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <div className='text-center px-2 h-96 bg-amber-700 flex flex-col items-center justify-center gap-4 sm:px-10'>
      <h1 className='text-center text-xl md:text-5xl text-white'>Welcome to our page</h1>
      <p className='text-base md:text-xl'>Browse movies and TV shows to ensure they are free from animal violence.</p>
      <div className='text-base sm:text-2xl relative m-2'>
        <input 
          className='p-2 sm:p-4 sm:w-screen max-w-5xl bg-amber-100 rounded-xl'
          type='text' 
          placeholder='Search...' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <button 
        className='p-2 sm:p-4 bg-amber-800 rounded-xl absolute right-0 hover:text-black'
        onClick={handleClick}>Search</button>
      </div>
    </div>
  );
};

export default Banner;

