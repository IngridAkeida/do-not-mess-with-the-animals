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

  const stylesPoster = 'w-32 md:w-60 object-cover rounded-md shadow-md';

  const firstDate = new Date(item.first_air_date).getFullYear();
  const lastDate = new Date(item.last_air_date).getFullYear();
  const timeAir = `${firstDate} - ${lastDate}`;
  const releaseDate = new Date(item.release_date).getFullYear();

  const year = item.first_air_date ? timeAir : releaseDate;
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
          <div className='bg-black bg-opacity-60'>
            <div className='flex flex-col'>
              <div className='flex gap-2 items-center bg-dark-neutral-a30 bg-opacity-85 py-2'>
                <h1 className='py-1 ml-4 font-bold text-5xl'>{item.name || item.title}</h1>
                <p className='font-light ml-2 text-4xl'>
                  {item.seasons && item.seasons.length > 0 ? '(TV Show)' : '(Movie)'}
                </p>
                <div className='flex items-center'>
                  <div className={`transition-opacity duration-300 hover:cursor-pointer
                    ${showModal ? 'opacity-0' : 'opacity-100'}`} 
                    onClick={() => setShowModal(true)}>
                      <FaPlay className='pl-2 text-4xl text-dark-primary-a10 transition-all hover:size-10 duration-300 hover:text-dark-primary-a20'/>
                  </div>
                </div>
              </div>
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
                <div className='flex flex-col pl-4 gap-2'>
                  <div className='flex'>
                    <div className='w-60 flex flex-col gap-1'>
                      <p className='flex justify-start items-center gap-1'>
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
                          <div className='flex gap-1'>
                            <p className='font-bold'>Created By</p>
                            <p className='font-light'>{item.created_by[0]?.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <TriggerMessage item={item} triggers={triggers}/>
                  </div>
                  <div className=''>
                    <p>Stars:</p>
                    <div className='flex gap-2'>
                      {item.credits.cast.slice(0, 8).map((cast, index) => (
                      <div key={index} className=''>
                        <div className=''>
                          <Image
                            className='rounded-md h-44 w-auto'
                            src={cast.profile_path
                              ? `https://www.doesthedogdie.com/content/1200/0/${cast.profile_path}`
                              : '/assets/person-nf.png'}
                            width={200}
                            height={200}
                            alt={cast.name}
                          />
                        </div>
                        <div className='max-w-28 flex flex-col justify-center items-center text-center'>
                          <h2 className='font-bold'>{cast.name}</h2>
                          <p className='text-sm'>{cast.character}</p>
                        </div>
                      </div>
                      ))}
                    </div>  
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 bg-gradient-to-t from-black to-transparent'>
              <p className='font-bold'>{item.tagline}</p>
              <p className='font-semibold pb-4'>{item.overview}</p>
              <CustomSlider
              title='Seasons'
              items={item.seasons}
              settings={settings}
              isSeason={true}
            />
            </div>
          </div>
        </div>
        <div>
        <div className='flex gap-2'>
          <TriggerResult triggers={triggers} item={item} />
          
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
