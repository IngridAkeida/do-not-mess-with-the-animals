import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const LayoutSection = ({ children, adicionalStyle }) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#201e1e'; 
      document.body.style.color = '#FFFFFF'; 
    } else {
      document.body.style.backgroundColor = '#fabd15'; 
      document.body.style.color = '#ffffff'; 
    }
  }, [theme]);

  return (
    <div className={`${adicionalStyle} py-6 ${theme === 'dark' ? 'bg-dark-primary-a40 text-white' : 'bg-[#f0e2bc]  text-dark-neutral-a40 '}`}>
      {children}
    </div>
  );
};

export default LayoutSection;