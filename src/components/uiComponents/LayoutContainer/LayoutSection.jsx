import { useTheme } from 'next-themes';

const LayoutSection = ({ children, adicionalStyle }) => {
  const { theme } = useTheme();
  return (
    <div className={`${adicionalStyle} p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40 text-white' : 'bg-light-primary-100 text-dark-primary-a40'}`}>
      {children}
    </div>
  );
};

export default LayoutSection;