import Image from "next/image";

const Banner = () => {
  return (
    <div className='h-96 bg-blue-700 flex flex-col items-center justify-center gap-4 px-10'>
      <h1 className='text-5xl'>Welcome to our page</h1>
      <p className='text-2xl'>Browse movies and TV shows to ensure they are free from animal violence.</p>
      <div className='text-2xl relative'>
        <input type='text' placeholder='Search' className='p-4 w-screen max-w-5xl bg-blue-100 rounded-xl'/>
        <button className='p-4 bg-blue-800 rounded-xl absolute right-0 hover:text-black'>Search</button>
      </div>
    </div>
  );
};

export default Banner;

