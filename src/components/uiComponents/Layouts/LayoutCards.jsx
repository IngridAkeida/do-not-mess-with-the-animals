
const LayoutCards = ({ children }) => {
  return (
    <div className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out'>
      {children}
    </div>
  );
};

export default LayoutCards;