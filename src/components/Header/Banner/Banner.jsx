'use client';
import DetailsContent from '@/components/uiComponents/DetailsContent/DetailsContent';
import Modal from '@/components/uiComponents/Modal/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import TriggerFetch from '@/components/uiComponents/DDDFetch/DDDFetch';

const Banner = ({randomItem, addVideo}) => {

  const [showModalVideo, setShowModalVideo] = useState(false);
  const [showModalTrigger, setShowModalTrigger] = useState(false);

  const imagePath = randomItem?.backgroundImage || randomItem?.backdrop_path;
  const backgroundImage = imagePath 
    ? `https://image.tmdb.org/t/p/w780${imagePath}` 
    : '/assets/movie-nf.png';

  const nameTitle = randomItem?.name || randomItem?.title;

  const videoToShow = addVideo?.results.find(video => video.official) || addVideo?.[0];

  const handleModalVideoClick = () => {
    setShowModalVideo(!showModalVideo);
  };
  const handleModalTriggerClick = () => {
    setShowModalTrigger(!showModalTrigger)
  };

  const stylesVideo = 'fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full';
  const stylesVideoContent = 'flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-auto p-1 bg-black bg-opacity-80';
  // modal triigger
  const stylesTrigger = 'fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full mt-6';
  const stylesTriggerContent = 'flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[40%] lg:h-[85%] p-1 bg-dark-neutral-a30 rounded-md';

  if (!randomItem) {
    return null;
  } 

  let resultType = '';

  if (randomItem.media_type === 'tv') {
    resultType = 'tvshow';
  } else {
    resultType = 'movie';
  }

  return (
    <div 
      className='relative flex-col flex gap-2 items-center justify-center md:justify-start w-auto h-[120%] bg-cover bg-center -mt-14'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    > 
      <div className='absolute inset-0 bg-gradient-to-br to-dark-neutral-a50 via-dark-accent-a40 from-dark-neutral-a50 opacity-65'></div>

      <div className='relative text-center mx-2 md:mx-0 md:h-96 sm:h-96 sm:flex items-end justify-center md:gap-4 rounded-b-md text-white w-full'>
        {/* <div className='md:w-1/2 flex flex-col justify-center items-center md:gap-y-2'>
          <h1 className='text-center font-bold text-lg pb-2 md:text-4xl xl:text-5xl bg-gradient-to-br from-white via-dark-menu-y10  to-white bg-clip-text text-transparent'
          style={{ WebkitTextStroke: '0.1px white' }}>
            Welcome to Watch Safe Cinema
          </h1> 
          <p className='text-xs md:text-xl'>
            Explore movies and TV shows with confidence, and know if they&apos;re free from unwanted <span className='text-dark-primary-a0 font-semibold bg-dark-menu-y10 p-0.5 md:py-0.5 md:px-1 rounded-md'>triggers</span>.
          </p>
          <p className='text-xs md:text-xl'>
            Create an account to save your <span className='text-dark-menu-y10 font-semibold'>favorites</span>, <span className='text-dark-menu-y10 font-semibold'>wish list</span>, <span className='text-dark-menu-y10 font-semibold'>watched</span>, or <span className='text-dark-menu-y10 font-semibold'>unwanted</span> content.
          </p>
          <p className='text-xs md:text-xl'>Discover everything about movies and so much more.</p>
        </div>*/}
        <div className='flex'>
          {/* <div className='absolute'>
            <Image src={`https://image.tmdb.org/t/p/original${imagePath}`} alt={nameTitle} className='object-contain rounded-md h-96 md:h-full md:w-full opacity-85' width={780} height={780} />
          </div> */}
          <div className='rounded-md -my-20 w-80'>
            <div className='flex items-center pr-4 pb-4 flex-col text-center h-full w-auto gap-2'>
              <div className='text-5xl font-bold'>{nameTitle}</div>
              <div className=''>
                <DetailsContent 
                  item={randomItem} 
                  handleModalTriggerClick={handleModalTriggerClick} handleModalVideoClick={handleModalVideoClick}
                  showModalVideo={showModalVideo} 
                  showModalTrigger={showModalTrigger}
                />
              </div>
              <Link className='flex justify-center items-center h-10 w-[30%] bg-dark-menu-y10 rounded-md hover:opacity-95 text-dark-primary-a20 mt-2 px-2 py-1' href={`/${resultType}/${randomItem.id}`}>
                <FaPlus/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      { addVideo && addVideo.results.length > 0 && (
        <Modal isVisible={showModalVideo} styleContainer = {stylesVideo} styleContent= {stylesVideoContent} onClose={handleModalVideoClick}>
          <div className='flex items-center justify-center w-full h-full'>
            <div className='relative w-full h-0 pb-[56.25%]'>
              <iframe
                className='absolute top-0 left-0 w-full h-full'
                src={`https://www.youtube.com/embed/${videoToShow?.key}`}
                title={nameTitle}
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
            <TriggerFetch itemForQuery={randomItem} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Banner;

