'use client';
import SearchField from '../../uiComponents/SearchField/SearchField'; 

const Banner = () => {

  const SearchWrapStyle = 'text-base sm:text-2xl relative m-2';
  const SearchInputStyle = 'p-2 sm:p-4 sm:w-screen max-w-5xl bg-blue-100 rounded-xl text-blue-900';
  const SearchButtonStyle = 'p-2 sm:p-4 bg-teal-600 hover:bg-blue-900 rounded-xl absolute right-0 text-white hover:text-blue-100';

  return (
    <div className='text-center px-2 mx-2 sm:mx-0 h-52 sm:h-96 bg-gradient-to-br from-teal-600 to-blue-900 flex flex-col items-center justify-center gap-4 sm:px-10 rounded-b-md text-blue-200'>
      <h1 className='text-center text-xl md:text-5xl'>Welcome to our page</h1>
      <p className='text-base md:text-xl'>Browse movies and TV shows to ensure they are free from animal violence and others triggers</p>
      <SearchField 
        wrapStyle={SearchWrapStyle} 
        inputStyle={SearchInputStyle} 
        buttonStyle={SearchButtonStyle} 
      />
    </div>
  );
};

export default Banner;

