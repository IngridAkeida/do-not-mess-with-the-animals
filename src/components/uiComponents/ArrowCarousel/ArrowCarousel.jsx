const NextArrow = ({ onClick }) => {
  return (
    <div className='hidden z-10 cursor-pointer absolute top-1/2 -translate-y-1/2 w-10 bg-dark-neutral-a40 hover:bg-dark-neutral-a20 text-white hover:text-black p-2 rounded-full sm:flex justify-center items-center right-1' onClick={onClick}>
    {'>'}
    </div>
  );
}

const PrevArrow = ({ onClick }) => {
  return (
    <div className='hidden z-10 cursor-pointer absolute top-1/2 -translate-y-1/2 w-10 bg-dark-neutral-a40 hover:bg-dark-neutral-a20 text-white hover:text-black p-2 rounded-full sm:flex justify-center items-center left-1' onClick={onClick}>
     {'<'}
    </div>
  );
}

export { NextArrow, PrevArrow };