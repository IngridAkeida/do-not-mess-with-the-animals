'use client';
import SearchField from '../../uiComponents/SearchField/SearchField'; 

const Banner = () => {
  const SearchWrapStyle = 'text-base sm:text-2xl relative m-2';
  const SearchInputStyle = 'p-2 sm:w-screen max-w-5xl bg-alert-warning-100 rounded-3xl text-black';
  const SearchButtonStyle = 'p-3 bg-gradient-to-l from-dark-menu-y10 to-bg-alert-warning-100 hover:bg-dark-menu-y10 rounded-r-3xl absolute right-0 text-dark-neutral-a40';
  const SearchErrorStyle ='text-sm rounded-xl bg-alert-danger-600 text-alert-danger-100';

  return (
    <div className='text-center px-2 mx-2 sm:mx-0 h-52 sm:h-96 bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 flex flex-col items-center justify-center gap-4 sm:px-10 rounded-b-md text-white'>
      <h1 className='text-center text-xl md:text-5xl'>Welcome to our page</h1>
      <p className='text-base md:text-xl'>Browse movies and TV shows to ensure they are free from  triggers</p>
      <SearchField 
        wrapStyle={SearchWrapStyle} 
        inputStyle={SearchInputStyle} 
        buttonStyle={SearchButtonStyle} 
        errorStyle={SearchErrorStyle}
      />
    </div>
  );
};

export default Banner;

