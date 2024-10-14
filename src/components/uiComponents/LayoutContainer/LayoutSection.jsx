import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const LayoutSection = ({ children, adicionalStyle }) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#000000'; 
      document.body.style.color = '#FFFFFF'; 
    } else {
      document.body.style.backgroundColor = '#f8f8f8'; 
      document.body.style.color = '#ffffff'; 
    }
  }, [theme]);

  return (
    <div className={`${adicionalStyle} p-6 ${theme === 'dark' ? 'bg-dark-neutral-a40  text-white' : 'bg-white  text-dark-neutral-a40 '}`}>
      {children}
    </div>
  );
};

export default LayoutSection;