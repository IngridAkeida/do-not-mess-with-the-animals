import { MdTheaters } from 'react-icons/md';
import { FaTheaterMasks, FaRobot, FaSkull, FaLaugh, FaHeart, FaDragon, FaTv, FaMusic, FaHistory, FaFilm } from 'react-icons/fa';
import { GiWesternHat, GiFamilyHouse, GiSwordman, GiWarAxe } from 'react-icons/gi';
import { MdAnimation } from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';
import { RiPoliceCarFill } from 'react-icons/ri';
import { FaSurprise } from 'react-icons/fa';


const getGenreIcon = (slug) => {
  const action = 'action' || 'action-adventure-tv''
  const icons = {
    // Movie genres
    'action': <GiSwordman className='h-20 w-20' />,
    'adventure': <IoIosRocket className='h-20 w-20' />,
    'animation':  <MdAnimation className='h-20 w-20' />,
    'comedy': <FaLaugh className='h-20 w-20' />,
    'crime': <RiPoliceCarFill className='h-20 w-20' />,
    'documentary': <FaTv className='h-20 w-20' />,
    'drama': <FaTheaterMasks className='h-20 w-20' />,
    'family': <GiFamilyHouse className='h-20 w-20' />,
    'fantasy': <FaDragon className='h-20 w-20' />,
    'history': <FaHistory className='h-20 w-20' />,
    'horror': <FaSkull className='h-20 w-20' />,
    'music': <FaMusic className='h-20 w-20' />,
    'mystery': <GiWesternHat className='h-20 w-20' />,
    'romance': <FaHeart className='h-20 w-20' />,
    'scifi': <FaRobot className='h-20 w-20' />,
    'tv-movie': <FaTv className='h-20 w-20' />,
    'thriller': <FaSurprise  className='h-20 w-20' />,
    'war': <GiWarAxe className='h-20 w-20' />,
    'western': <GiWesternHat className='h-20 w-20' />,
    // TV Show genres
    'action': <GiSwordman className='h-20 w-20' />,
    'adventure': <IoIosRocket className='h-20 w-20' />,
    'animation':  <MdAnimation className='h-20 w-20' />,
    'comedy': <FaLaugh className='h-20 w-20' />,
    'crime': <RiPoliceCarFill className='h-20 w-20' />,
    'documentary': <FaTv className='h-20 w-20' />,
    'drama': <FaTheaterMasks className='h-20 w-20' />,
    'family': <GiFamilyHouse className='h-20 w-20' />,
    'fantasy': <FaDragon className='h-20 w-20' />,
    'history': <FaHistory className='h-20 w-20' />,
    'horror': <FaSkull className='h-20 w-20' />,
    'music': <FaMusic className='h-20 w-20' />,
    'mystery': <GiWesternHat className='h-20 w-20' />,
    'romance': <FaHeart className='h-20 w-20' />,
    'scifi': <FaRobot className='h-20 w-20' />,
    'tv-movie': <FaTv className='h-20 w-20' />,
    'thriller': <FaSurprise  className='h-20 w-20' />,
    'war': <GiWarAxe className='h-20 w-20' />,
    'western': <GiWesternHat className='h-20 w-20' />,
  };

  return icons[slug] || <MdTheaters className='h-20 w-20' />;
};

export default getGenreIcon;