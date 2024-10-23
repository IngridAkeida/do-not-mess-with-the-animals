import { useTheme } from 'next-themes';

const LayoutSubtitles = ({children, addStyles}) => {
  const { theme } = useTheme();

  return (
    <div className={`${addStyles} text-center text-2xl mb-4 font-semibold ${theme === 'dark' ? 'text-white' : 'text-dark-neutral-a40 '}`}>
      {children}
    </div>
  );
};

export default LayoutSubtitles;