import { useTheme } from 'next-themes';
const LayoutCards = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={`h-80 w-52 rounded-md flex flex-col items-center justify-center transition duration-300 cursor-pointer hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out
    ${theme === 'dark' ?  'bg-dark-accent-a40 hover:bg-dark-accent-a30 hover:text-dark-accent-a0  text-white' : 'bg-dark-primary-a30 hover:bg-dark-primary-a40  text-white'}`}>
      {children}
    </div>
  );
};

export default LayoutCards;