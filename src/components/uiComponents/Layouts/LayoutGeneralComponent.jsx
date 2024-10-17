import { useTheme } from 'next-themes';

const GeneralComponent = ({ children, additionalStyles }) => {
  const { theme } = useTheme();

  return (
    <div className={`${additionalStyles} ${theme === 'dark' ? 'bg-[#f0e2bc]  text-dark-neutral-a40'  : 'bg-dark-primary-a30 text-white'}`}>
      {children}
    </div>
  );
};

export default GeneralComponent;