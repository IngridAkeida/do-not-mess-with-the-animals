import { MdTheaters } from 'react-icons/md';
import { FaTheaterMasks, FaRobot, FaSkull, FaLaugh, FaHeart, FaDragon, FaTv, FaMusic, FaHistory } from 'react-icons/fa';
import { GiWesternHat, GiLifeInTheBalance, GiFamilyHouse, GiSwordman, GiWarAxe } from 'react-icons/gi';
import { MdAnimation } from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';
import { RiPoliceCarFill } from 'react-icons/ri';
import { FaSurprise } from 'react-icons/fa';
import { TbBalloonFilled } from 'react-icons/tb';
import { GiDramaMasks } from 'react-icons/gi';
import { IoChatbubbles } from 'react-icons/io5';


const ACTION = ['action', 'action-adventure-tv'];
const ADVENTURE = ['adventure'];
const ANIMATION = ['animation', 'animation-tv'];
const COMEDY = ['comedy', 'comedy-tv'];
const CRIME = ['crime', 'crime-tv'];
const DOCUMENTARY = ['documentary', 'documentary-tv'];
const DRAMA = ['drama', 'drama-tv'];
const FAMILY = ['family', 'family-tv'];
const FANTASY = ['fantasy', 'scifi-fantasy-tv'];
const HISTORY = ['history'];
const HORROR = ['horror'];
const MUSIC = ['music'];
const MYSTERY = ['mystery', 'mystery-tv'];
const ROMANCE = ['romance'];
const SCIFI = ['scifi'];
const TV_MOVIE = ['tv-movie'];
const THRILLER = ['thriller', 'thriller-tv'];
const WAR = ['war', 'war-politics-tv'];
const WESTERN = ['western', 'western-tv'];
const NEWS = [ 'news-tv'];
const REALITY = ['reality-tv'];
const KIDS = ['kids-tv'];
const SOAP = ['soap-tv'];
const TALK = ['talk-tv'];


const icons = {
  [ACTION]: <GiSwordman className='h-20 w-20' />,
  [ADVENTURE]: <IoIosRocket className='h-20 w-20' />,
  [ANIMATION]: <MdAnimation className='h-20 w-20' />,
  [COMEDY]: <FaLaugh className='h-20 w-20' />,
  [CRIME]: <RiPoliceCarFill className='h-20 w-20' />,
  [DOCUMENTARY]: <FaTv className='h-20 w-20' />,
  [DRAMA]: <FaTheaterMasks className='h-20 w-20' />,
  [FAMILY]: <GiFamilyHouse className='h-20 w-20' />,
  [FANTASY]: <FaDragon className='h-20 w-20' />,
  [HISTORY]: <FaHistory className='h-20 w-20' />,
  [HORROR]: <FaSkull className='h-20 w-20' />,
  [MUSIC]: <FaMusic className='h-20 w-20' />,
  [MYSTERY]: <GiWesternHat className='h-20 w-20' />,
  [ROMANCE]: <FaHeart className='h-20 w-20' />,
  [SCIFI]: <FaRobot className='h-20 w-20' />,
  [TV_MOVIE]: <FaTv className='h-20 w-20' />,
  [THRILLER]: <FaSurprise className='h-20 w-20' />,
  [WAR]: <GiWarAxe className='h-20 w-20' />,
  [WESTERN]: <GiWesternHat className='h-20 w-20' />,
  [NEWS]: <FaTv className='h-20 w-20' />,
  [REALITY]: <GiLifeInTheBalance className='h-20 w-20' />,
  [KIDS]: <TbBalloonFilled className='h-20 w-20' />,
  [SOAP]: <GiDramaMasks className='h-20 w-20' />,
  [TALK]: <IoChatbubbles className='h-20 w-20' />,
};

// Função para obter o ícone com base no slug
const getGenreIcon = (slug) => {
  for (const key in icons) {
    if (key.includes(slug)) {
      return icons[key];
    }
  }
  return <MdTheaters className='h-20 w-20' />; // Ícone padrão
};

export default getGenreIcon;
