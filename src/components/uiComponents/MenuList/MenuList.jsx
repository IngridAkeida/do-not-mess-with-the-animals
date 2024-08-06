import { FaUser } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


export const NavigationInfo = [
  {
    name: 'Movies',
    subMenu: [
      { name: 'Popular', href: '/' },
      { name: 'Now Playing', href: '/' },
      { name: 'Top Rated', href: '/' },
      { name: 'Upcoming', href: '/' },
    ], href: '/' },
  { name: 'TV Shows', 
    subMenu: [
      { name: 'Popular', href: '/' },
      { name: 'Now Playing', href: '/' },
      { name: 'Top Rated', href: '/' },
      { name: 'Upcoming', href: '/' },
    ], href: '/' },
  { name: 'People',
    subMenu: [
      { name: 'General', href: '/' },
      { name: 'Actors', href: '/' },
      { name: 'Directors', href: '/' },
      { name: 'Producers', href: '/' },
      { name: 'Writers', href: '/' },
    ], href: '/' },
];

export const NavigationUser = [
  { name: <FaUser />, href: '/' },
  { name: <FaLanguage />, href: '/' },
  { name: <MdDarkMode /> || <MdLightMode /> , href: '/' }
];