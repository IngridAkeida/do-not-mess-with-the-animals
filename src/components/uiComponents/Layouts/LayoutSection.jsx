import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const LayoutSection = ({ children, adicionalStyle }) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#162b2b'; 
      document.body.style.color = '#FFFFFF'; 
    } else {
      document.body.style.backgroundColor = '#fabd15'; 
      document.body.style.color = '#ffffff'; 
    }
  }, [theme]);

  return (
    <div className={`${adicionalStyle} py-4 rounded-md mb-2 ${theme === 'dark' ? 'bg-dark-primary-a40 text-white' : 'bg-[#f0e2bc]  text-dark-neutral-a40 '}`}>
      {children}
    </div>
  );
};

export default LayoutSection;