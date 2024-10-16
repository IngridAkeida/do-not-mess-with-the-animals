import { FaUser } from 'react-icons/fa';
import { FaLanguage } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import { MdLightMode } from 'react-icons/md';
import { FaFilm, FaStar, FaCalendarAlt, FaThList } from 'react-icons/fa';
import { MdPeople, MdPerson, MdMovieCreation } from 'react-icons/md';
import { useTheme } from 'next-themes';
import Link from 'next/link';


export const NavigationInfo = [
  {
    name: 'About Us',
    subMenu: [
      { name: 'Vision', href: '#', icon: <MdPeople className='h-20 w-20'/> },
      { name: 'Mission', href: '#', icon: <MdPerson className='h-20 w-20'/> },
      { name: 'Documentation', href: '#', icon: <MdMovieCreation className='h-20 w-20'/> },
    ],
  },
  {
    name: 'Movies',
    subMenu: [
      { name: 'Popular', href: '/movies/popular', icon: <FaFilm className='h-20 w-20'/> },
      { name: 'Top Rated', href: '/movies/toprated', icon: <FaStar className='h-20 w-20'/> },
      { name: 'Upcoming', href: '/movies/upcoming', icon: <FaCalendarAlt className='h-20 w-20'/> },
      { name: 'Genres', href: '/movies/genres', icon: <FaThList className='h-20 w-20'/> },
    ],
  },
  {
    name: 'TV Shows',
    subMenu: [
      { name: 'Popular', href: '/tvshows/popular', icon: <FaFilm className='h-20 w-20'/> },
      { name: 'Top Rated', href: '/tvshows/toprated', icon: <FaStar className='h-20 w-20'/> },
      { name: 'Upcoming', href: '/tvshows/upcoming', icon: <FaCalendarAlt className='h-20 w-20'/> },
      { name: 'Genres', href: '/tvshows/genres', icon: <FaThList className='h-20 w-20'/> },
    ],
  },
  {
    name: 'People',
    subMenu: [
      { name: 'Popular', href: '/people/popular', icon: <MdPeople className='h-20 w-20'/> },
      { name: 'Actors', href: '/people/actors', icon: <MdPerson className='h-20 w-20'/> },
      { name: 'Producers', href: '/people/producers', icon: <MdMovieCreation className='h-20 w-20'/> },
    ],
  },
];

const SwitchDarkMode = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return(
  <button
        onClick={handleThemeToggle}
        className=''
      >
        {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
  </button>
)}


export const NavigationUser = () => {
  const navigationMenu = [
    { name: <FaUser />, href: '/user' },
    { name: <FaLanguage />, href: '/' },
    { name: <SwitchDarkMode/>, href: '#' },
  ];

  return(
    <ul className='flex space-x-4 justify-center items-center'>
      {navigationMenu.map((item, index) => (
        <li key={index}>
          {item.href ? (
            <Link href={item.href} className='flex items-center hover:underline'>
              {item.name}
            </Link>
          ) : (
            item.name
          )}
        </li>
      ))}
    </ul>
  )
};




