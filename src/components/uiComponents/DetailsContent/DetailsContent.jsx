import { useState } from "react";
import { RiAlarmWarningFill } from 'react-icons/ri';
import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import { RiPlayLargeFill } from 'react-icons/ri';

const DetailsContent = ({ item, handleModalTriggerClick, handleModalVideoClick, showModalTrigger, showModalVideo }) => {

  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const firstDate = new Date(item.first_air_date).getFullYear();
  const lastDate = new Date(item.last_air_date).getFullYear();
  const timeAir = `${firstDate} - ${lastDate}`;
  const releaseDate = new Date(item.release_date).getFullYear();
  const year = item.first_air_date ? timeAir : releaseDate;

  const stylesButton = 'p-2 text-dark-primary-a10 transition-all size-10 duration-300 bg-dark-menu-y10 rounded-full hover:text-dark-primary-a20';

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return(
    <div className='text-sm'>
      <p>{year}</p>
      {item.seasons && item.seasons.length > 0 && (
        <div className='flex gap-1'>
          <p className='font-bold'>Seasons</p>
          <p className='font-light'>{item.number_of_seasons}</p>
        </div>
      )}
      <div className='flex gap-1'>
        <p className='font-bold'>Status</p>
        <p className='font-light'>{item.status}</p>
      </div>
      {item.seasons && item.seasons.length > 0 && (
        <div className='flex gap-1 w-60'>
          <p className='font-bold '>Created By</p>
          <p className='font-light'>{item.created_by[0]?.name}</p>
        </div>
      )}
      <div className='flex items-center h-12'>
        <div className={`transition-opacity w-12 duration-300 hover:cursor-pointer
          ${showModalVideo ? 'opacity-0' : 'opacity-100'}`} 
          onClick={handleModalVideoClick}>
            <RiPlayLargeFill className={stylesButton}/>
        </div>
        <div className={`transition-opacity w-12 duration-300 hover:cursor-pointer
          ${showModalTrigger ? 'opacity-0' : 'opacity-100'}`} 
          onClick={handleModalTriggerClick}>
          <RiAlarmWarningFill className={stylesButton}/>
        </div>
        <div className={`transition-opacity w-12 duration-300 hover:cursor-pointer
          ${showModalVideo ? 'opacity-0' : 'opacity-100'}`} 
          onClick={handleFavoriteClick}>
            {isFavorited ? 
              <FaHeart className={stylesButton}/> : 
              <FaRegHeart className={stylesButton}/>
            }
        </div>
        <div className={`transition-opacity w-12 duration-300 hover:cursor-pointer
          ${showModalTrigger ? 'opacity-0' : 'opacity-100'}`} 
          onClick={handleAddClick}>
            {isAdded ? 
              <FaCheck className={stylesButton}/> : 
              <FaPlus className={stylesButton}/>
            }
        </div>
      </div>
    </div>
  )
}

export default DetailsContent;