import { useTheme } from 'next-themes';
const LayoutCards = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={`h-80 w-52 rounded-md flex flex-col items-center justify-center transition duration-300 cursor-pointer hover:shadow-lg hover:border border-transparent text-white
    ${theme === 'dark' ?  
    ' bg-gradient-to-t from-dark-accent-a30 to-dark-accent-a40 hover:from-dark-accent-a40 hover:to-dark-accent-a40' 
    : 
    'bg-dark-primary-a30 hover:bg-dark-primary-a40'}`}>
      {children}
    </div>
  );
};

export default LayoutCards;