import { FaUser } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


export const NavigationInfo = [
  {
    name: 'Movies',
    subMenu: [
      { name: 'Popular', href: '/' },
      { name: 'Top Rated', href: '/' },
      { name: 'Upcoming', href: '/' },
      { name: 'Genres', href: '/movies/genres' },
    ]},
  { name: 'TV Shows', 
    subMenu: [
      { name: 'Populars', href: '/' },
      { name: 'Top Rated', href: '/' },
      { name: 'Upcoming', href: '/' },
      { name: 'Genres', href: '/' },
    ]},
  { name: 'People',
    subMenu: [
      { name: 'Popular', href: '/' },
      { name: 'Actors', href: '/' },
      { name: 'Producers', href: '/' },
    ]},
];

export const NavigationUser = [
  { name: <FaUser />, href: '/user' },
  { name: <FaLanguage />, href: '/' },
  { name: <MdDarkMode /> || <MdLightMode /> , href: '/' }
];