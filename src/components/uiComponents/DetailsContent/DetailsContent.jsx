import { useState } from "react";
import { RiAlarmWarningFill } from 'react-icons/ri';
import { FaRegHeart, FaHeart, FaPlus, FaCheck} from 'react-icons/fa';
import { RiPlayLargeFill } from 'react-icons/ri';
import GenreColors from '../GenreColors/GenreColors';

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

  const genres = item.genres || item.genre_ids;

  const genreColors = GenreColors;

  return(
    <div className='w-60 flex flex-col gap-1'>
      <p className='flex justify-start items-center gap-1'>
        {genres.map((genre) => (
          <span
            key={genre.id}
            className={`py-0.5 px-1 text-xs font-semibold rounded-lg ${genreColors[genre.id]}`}
          >
            {genre.name}
          </span>
        ))}
      </p>
      <div className='text-sm'>
        <p>{year}</p>
        {item.seasons && item.seasons.length > 0 && (
          <div className='flex gap-1'>
            <p className='font-bold'>Seasons</p>
            <p className='font-light'>{item.number_of_seasons}</p>
          </div>
        )}
        {item.status && item.status.length > 0 && (
        <div className='flex gap-1'>
          <p className='font-bold'>Status</p>
          <p className='font-light'>{item.status}</p>
        </div>
        )}
        {item.seasons && item.seasons.length > 0 && (
          <div className='flex gap-1 w-60'>
            <p className='font-bold '>Created By</p>
            <p className='font-light'>{item.created_by[0]?.name}</p>
          </div>
        )}
        <div className='flex items-center justify-center h-12'>
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
          <div className='w-12 hover:cursor-pointer' 
            onClick={handleFavoriteClick}>
              {isFavorited ? 
                <FaHeart className={stylesButton}/> : 
                <FaRegHeart className={stylesButton}/>
              }
          </div>
          <div className='w-12 hover:cursor-pointer' 
            onClick={handleAddClick}>
              {isAdded ? 
                <FaCheck className={stylesButton}/> : 
                <FaPlus className={stylesButton}/>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsContent;