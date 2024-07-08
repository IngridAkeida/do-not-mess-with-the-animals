const Banner = () => {
  return (
    <div className='text-center px-2 h-96 bg-blue-700 flex flex-col items-center justify-center gap-4 sm:px-10'>
      <h1 className='text-center text-xl md:text-5xl text-white'>Welcome to our page</h1>
      <p className='text-base md:text-xl'>Browse movies and TV shows to ensure they are free from animal violence.</p>
      <div className='text-base sm:text-2xl relative m-2'>
        <input type='text' placeholder='Search' className='p-2 sm:p-4 sm:w-screen max-w-5xl bg-blue-100 rounded-xl'/>
        <button className='p-2 sm:p-4 bg-blue-800 rounded-xl absolute right-0 hover:text-black'>Search</button>
      </div>
    </div>
  );
};

export default Banner;

