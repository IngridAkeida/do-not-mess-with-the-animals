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

const styleIcon = 'h-20 w-20';

const ACTION = ['action'];
const ACTION2 = ['action-adventure-tv'];
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
  [ACTION]: <GiSwordman className={styleIcon} />,
  [ACTION2]: <FaDragon className={styleIcon} />,
  [ADVENTURE]: <IoIosRocket className={styleIcon} />,
  [ANIMATION]: <MdAnimation className={styleIcon} />,
  [COMEDY]: <FaLaugh className={styleIcon} />,
  [CRIME]: <RiPoliceCarFill className={styleIcon} />,
  [DOCUMENTARY]: <FaTv className={styleIcon} />,
  [DRAMA]: <FaTheaterMasks className={styleIcon} />,
  [FAMILY]: <GiFamilyHouse className={styleIcon} />,
  [FANTASY]: <FaDragon className={styleIcon} />,
  [HISTORY]: <FaHistory className={styleIcon} />,
  [HORROR]: <FaSkull className={styleIcon} />,
  [MUSIC]: <FaMusic className={styleIcon} />,
  [MYSTERY]: <GiWesternHat className={styleIcon} />,
  [ROMANCE]: <FaHeart className={styleIcon} />,
  [SCIFI]: <FaRobot className={styleIcon} />,
  [TV_MOVIE]: <FaTv className={styleIcon} />,
  [THRILLER]: <FaSurprise className={styleIcon} />,
  [WAR]: <GiWarAxe className={styleIcon} />,
  [WESTERN]: <GiWesternHat className={styleIcon} />,
  [NEWS]: <FaTv className={styleIcon} />,
  [REALITY]: <GiLifeInTheBalance className={styleIcon} />,
  [KIDS]: <TbBalloonFilled className={styleIcon} />,
  [SOAP]: <GiDramaMasks className={styleIcon} />,
  [TALK]: <IoChatbubbles className={styleIcon} />,
};

// Função para obter o ícone com base no slug
const getGenreIcon = (slug) => {
  for (const key in icons) {
    if (key.includes(slug)) {
      return icons[key];
    }
  }
  return <MdTheaters className={styleIcon} />; // Ícone padrão
};

export default getGenreIcon;
