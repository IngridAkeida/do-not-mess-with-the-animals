import { Fragment, useState } from 'react';
import Image from 'next/image';
import GenreColors from '../../uiComponents/GenreColors/GenreColors';
import { FaPlay } from 'react-icons/fa';
import VideoModal from '../../uiComponents/Modal/VideoModal';
import CustomSlider from '../../uiComponents/CustomSlider/CustomSlider';
import TriggerResult from '../../Main/TriggerResult/TriggerResult';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Settings from '../../uiComponents/Settings/Settings';
import TriggerMessage from '@/components/TriggerMessage';

const BannerResult = ({ item, triggers }) => {

  const [showModal, setShowModal] = useState(false);
  const backgroundImage = item.backdrop_path
    ? `https://www.doesthedogdie.com/content/1800/0/${item.backdrop_path}`
    : '/assets/movie-nf.png';

  const stylesPoster = 'w-32 md:w-24 max-h-96 object-cover rounded-md shadow-md';

  const genreColors = GenreColors;
  const settings = Settings;

  console.log(item)

  return (
    <Fragment>
      <div>
        <div
          className='flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center'
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className='flex'>
            <div className='flex p-4 relative'>
              <Image
                className={stylesPoster}
                src={item.poster_path
                  ? `https://www.doesthedogdie.com/content/1200/0/${item.poster_path}`
                  : '/assets/movie-nf.png'}
                width={300}
                height={300}
                alt={item.title || item.name}
              />
              
              <div className='pl-4'>
                <div className='flex items-center'>
                  <h1 className='py-1 font-bold'>{item.name || item.title}</h1>
                  <p className='font-semibold text-sm ml-2'>
                    {item.seasons && item.seasons.length > 0 ? 'TV Show' : 'Movie'}
                  </p>
                  <div className={`transition-opacity duration-300 hover:cursor-pointer
                    ${showModal ? 'opacity-0' : 'opacity-100'}`} 
                    onClick={() => setShowModal(true)}>
                      <FaPlay className="pl-2 text-xl text-dark-primary-a10 transition-all hover:size-6  duration-300 hover:text-dark-primary-a20 "/>
                    </div>
                </div>
                <p className='flex flex-wrap gap-1'>
                  {item.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className={`px-1 text-xs rounded-lg ${genreColors[genre.id]}`}
                    >
                      {genre.name}
                    </span>
                  ))}
                </p>
                <div className='text-sm'>
                  <p>{item.release_date || item.first_air_date}</p>
                  {item.seasons && item.seasons.length > 0 && (
                    <p><span className='font-semibold'>Seasons: </span>{item.number_of_seasons}</p>
                  )}
                  <p><span className='font-semibold'>Status: </span>{item.status}</p>
                  {item.seasons && item.seasons.length > 0 && (
                    <p><span className='font-semibold'>Created By: </span>{item.created_by[0]?.name}</p>
                  )}
                </div>
                
              </div>
            </div>
          </div>

          <div className='px-4 bg-gradient-to-t from-black to-transparent'>
            <p className='font-bold'>{item.tagline}</p>
            <p className='font-semibold pb-4'>{item.overview}</p>
            <TriggerMessage item={item} triggers={triggers}/>
            <CustomSlider
            title='Seasons'
            items={item.seasons}
            settings={settings}
            isSeason={true}
          />
          </div>
        </div>
        <div>
        <div className='flex gap-2'>
          <TriggerResult triggers={triggers} item={item} />
          <div className='w-[620px] flex flex-row flex-wrap gap-
          2 justify-center items-center bg-dark-neutral-a40 rounded-md shadow-md p-2 m-2 gap-2'>
            {item.credits.cast.map((cast, index) => (
            <div key={index} className='bg-dark-neutral-a30 p-6 flex flex-col justify-center items-center w-48'>
              <div className='w-32 h-auto'>
                <Image
                  className='rounded-md'
                  src={cast.profile_path
                    ? `https://www.doesthedogdie.com/content/1200/0/${cast.profile_path}`
                    : '/assets/person-nf.png'}
                  width={200}
                  height={200}
                  alt={cast.name}
                />
              </div>
              <div className='pt-2 flex flex-col justify-center items-center'>
                <h2 className='font-bold'>{cast.name}</h2>
                <p className='text-sm'>{cast.character}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
          
          <CustomSlider
            title='Similar Titles'
            items={item.similar?.results}
            settings={settings}
            isSeason={false}
          />
        </div>
      </div>
      { item.videos.results.length > 0 && (
      <VideoModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className='flex items-center justify-center w-full h-full'>
          <div className='relative w-full h-0 pb-[56.25%]'>
            <iframe
              className='absolute top-0 left-0 w-full h-full'
              src={`https://www.youtube.com/embed/${item.videos.results[0].key}`}
              title={item.name || item.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>
      </VideoModal>
      )}
    </Fragment>
  );
}

export default BannerResult;
