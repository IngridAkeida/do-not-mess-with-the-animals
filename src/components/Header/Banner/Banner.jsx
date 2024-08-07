'use client';
import SearchField from '../../uiComponents/SearchField/SearchField'; 

const Banner = () => {
  const SearchWrapStyle = 'text-base sm:text-2xl relative m-2';
  const SearchInputStyle = 'p-2 pl-6 sm:w-screen max-w-5xl bg-alert-warning-100 rounded-3xl text-black outline-none';
  const SearchButtonStyle = 'p-3 pl-8 bg-gradient-to-l from-dark-menu-y10 to-alert-warning-100 hover:bg-dark-menu-y10 rounded-r-3xl absolute right-0 text-dark-neutral-a40';
  const SearchButtonDisabledStyle = 'bg-gray-300 text-gray-500 cursor-none';

  return (
    <div className='text-center px-2 mx-2 sm:mx-0 h-52 sm:h-96 bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 flex flex-col items-center justify-center gap-4 sm:px-10 rounded-b-md text-white'>
      <h1 className='text-center text-xl md:text-5xl'>Welcome to our page</h1>
      <p className='text-base md:text-xl'>Browse movies and TV shows to ensure they are free from  triggers</p>
      <SearchField 
        wrapStyle={SearchWrapStyle} 
        inputStyle={SearchInputStyle} 
        buttonStyle={SearchButtonStyle}
        buttonDisabledStyle={SearchButtonDisabledStyle}
      />
    </div>
  );
};

export default Banner;

