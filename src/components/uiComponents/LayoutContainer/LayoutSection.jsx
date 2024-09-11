import { useTheme } from 'next-themes';

const LayoutSection = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-dark-primary-a40 text-white' : 'bg-light-primary-100 text-dark-primary-a40'}`}>
      {children}
    </div>
  );
};

export default LayoutSection;