import { Fragment, useState } from 'react';
import Image from 'next/image';
import { RiPlayLargeFill } from 'react-icons/ri';
import DetailContent from '../../uiComponents/DetailsContent/DetailsContent';
import Modal from '../../uiComponents/Modal/Modal';
import CustomSlider from '../../uiComponents/CustomSlider/CustomSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Settings from '../../uiComponents/Settings/Settings';
import TriggerResult from '../../Main/TriggerResult/TriggerResult';
import TriggerMessage from '@/components/TriggerMessage';
import TriggerFetch from '@/components/uiComponents/DDDFetch/DDDFetch';

const BannerResult = ({ item, triggers }) => {
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [showModalTrigger, setShowModalTrigger] = useState(false);
  
  const backgroundImage = item.backdrop_path
    ? `https://www.doesthedogdie.com/content/1800/0/${item.backdrop_path}`
    : '/assets/movie-nf.png';

  const stylesPoster = 'w-32 md:w-60 object-contain rounded-md shadow-md';

  const handleModalVideoClick = () => {
    setShowModalVideo(!showModalVideo);
  };
  const handleModalTriggerClick = () => {
    setShowModalTrigger(!showModalTrigger)
  };

  const settings = Settings;

  // modal epecific styles
  // modal video 
  const stylesVideo = 'fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full';
  const stylesVideoContent = 'flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-auto p-1 bg-black bg-opacity-80';

  // modal triigger
  const stylesTrigger = 'fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full mt-6';
  const stylesTriggerContent = 'flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[40%] lg:h-[85%] p-1 bg-dark-neutral-a30 rounded-md';

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
                    ${showModalVideo ? 'opacity-0' : 'opacity-100'}`} 
                    onClick={handleModalVideoClick}>
                      <RiPlayLargeFill className='pl-2 text-4xl text-dark-primary-a10 transition-all hover:size-10 duration-300 hover:text-dark-primary-a20'/>
                  </div>
                </div>
              </div>
              <div className='flex p-4 relative'>
                <div className='bg-dark-primary-a40 bg-opacity-70 flex items-center rounded-md flex-col text-center'> 
                  <Image
                    className={stylesPoster}
                    src={item.poster_path
                      ? `https://www.doesthedogdie.com/content/1200/0/${item.poster_path}`
                      : '/assets/movie-nf.png'}
                    width={300}
                    height={300}
                    alt={item.title || item.name}
                  />
                  {item.tagline && 
                    <p className='font-bold max-w-44 m-auto'>&quot;{item.tagline}&quot;</p>
                  }
                </div>
                <div className='flex flex-col pl-4 gap-2'>
                  <div className='flex'>
                    <DetailContent 
                      item={item} 
                      handleModalTriggerClick={handleModalTriggerClick} handleModalVideoClick={handleModalVideoClick}
                      showModalVideo={showModalVideo} 
                      showModalTrigger={showModalTrigger}
                    />
                    {/* <TriggerMessage item={item} triggers={triggers}/> */}
                  </div>
                  <div className='flex gap-x-6'>
                    <div className='px-4 pt-1 bg-dark-primary-a40 bg-opacity-70 rounded-md'>
                      <p>Stars:</p>
                      <div className='flex gap-2'>
                        {item.credits.cast.slice(0, 4).map((cast, index) => (
                        <div key={index} className=''>
                          <div className=''>
                            <Image
                              className='rounded-md h-44 w-auto'
                              src={cast.profile_path
                                ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                                : '/assets/default-user.png'}
                              width={500}
                              height={750}
                              priority={true}
                              alt={cast.name}
                            />
                          </div>
                          <div className='max-w-28 flex flex-col justify-center items-center text-center'>
                            <h2 className='text-sm font-bold'>{cast.name}</h2>
                            <p className='text-xs'>{cast.character}</p>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                    <div className='px-4 pt-1 bg-dark-primary-a40 bg-opacity-70 rounded-md'>
                      <p>Crew:</p>
                      <div className='flex gap-2'>
                        {item.credits.crew.slice(0, 3).map((crew, index) => (
                        <div key={index} className=''>
                          <div className=''>
                            <Image
                              className='rounded-md h-44 w-auto'
                              src={crew.profile_path
                                ? `https://image.tmdb.org/t/p/w500${crew.profile_path}`
                                : '/assets/default-user.png'}
                                width={500}
                                height={750}
                                priority={true}
                                alt={crew.name}
                            />
                          </div>
                          <div className='max-w-28 flex flex-col justify-center items-center text-center'>
                            <h2 className='text-sm font-bold'>{crew.name}</h2>
                            <p className='text-xs'>{crew.department}</p>
                          </div>
                        </div>
                        ))}
                      </div>  
                  </div>  
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 bg-gradient-to-t from-black to-transparent'>
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
          <CustomSlider
            title='Similar Titles'
            items={item.similar?.results}
            settings={settings}
            isSeason={false}
          />
        </div>
      </div>
      { item.videos.results.length > 0 && (
        <Modal isVisible={showModalVideo} styleContainer = {stylesVideo} styleContent= {stylesVideoContent} onClose={handleModalVideoClick}>
          <div className='flex items-center justify-center w-full h-full'>
            <div className='relative w-full h-0 pb-[56.25%]'>
              <iframe
                className='absolute top-0 left-0 w-full h-full'
                src={`https://www.youtube.com/embed/${item?.videos?.results[0]?.key}`}
                title={item.name || item.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          </div>
        </Modal>
      )}
        <Modal isVisible={showModalTrigger} styleContainer ={stylesTrigger} styleContent= {stylesTriggerContent} onClose={handleModalTriggerClick}>
          <div className='flex items-center justify-center'>
            <div className='relative'>
              <TriggerFetch itemForQuery={item} />
            </div>
          </div>
        </Modal>
    </Fragment>
  );
}

export default BannerResult;
