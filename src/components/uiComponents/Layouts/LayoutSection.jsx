import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const LayoutSection = ({ children, adicionalStyle }) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#201e1e'; 
      document.body.style.color = '#FFFFFF'; 
    } else {
      document.body.style.backgroundColor = '#f7f7f7'; 
      document.body.style.color = '#ffffff'; 
    }
  }, [theme]);

  return (
    <div className={`${adicionalStyle} py-4 rounded-md mb-2 ${theme === 'dark' ? 'bg-dark-neutral-a30 text-white' : 'bg-light-neutral-400   text-dark-neutral-a40 '}`}>
      {children}
    </div>
  );
};

export default LayoutSection;