import { FaUser } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaFilm, FaStar, FaCalendarAlt, FaThList } from 'react-icons/fa';
import { MdPeople, MdPerson, MdMovieCreation } from 'react-icons/md';


export const NavigationInfo = [
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
      { name: 'Popular', href: '/tvshow/popular', icon: <FaFilm className='h-20 w-20'/> },
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

export const NavigationUser = [
  { name: <FaUser />, href: '/user' },
  // { name: <FaLanguage />, href: '/' },
  { name: <MdDarkMode /> || <MdLightMode /> , href: '/' }
];