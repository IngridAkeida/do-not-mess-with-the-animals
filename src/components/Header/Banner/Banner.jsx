'use client';
import DetailsContent from '@/components/uiComponents/DetailsContent/DetailsContent';
import Modal from '@/components/uiComponents/Modal/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import TriggerFetch from '@/components/uiComponents/DDDFetch/DDDFetch';

const Banner = ({randomItem, matchFound, addVideo}) => {

  const [showModalVideo, setShowModalVideo] = useState(false);
  const [showModalTrigger, setShowModalTrigger] = useState(false);

  const imagePath = randomItem?.backgroundImage || randomItem?.backdrop_path;
  const backgroundImage = imagePath 
    ? `https://www.doesthedogdie.com/content/1800/0/${imagePath}` 
    : '/assets/movie-nf.png';

  const nameTitle = randomItem?.name || randomItem?.title;
  console.log('randomItem:', randomItem);

  const videoToShow = addVideo?.results.find(video => video.official) || addVideo?.[0];

  const handleModalVideoClick = () => {
    setShowModalVideo(!showModalVideo);
  };
  const handleModalTriggerClick = () => {
    setShowModalTrigger(!showModalTrigger)
  };

  console.log(randomItem)

  const stylesVideo = 'fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full';
  const stylesVideoContent = 'flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-auto p-1 bg-black bg-opacity-80';
  // modal triigger
  const stylesTrigger = 'fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full mt-6';
  const stylesTriggerContent = 'flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[40%] lg:h-[85%] p-1 bg-dark-neutral-a30 rounded-md';

  if (!randomItem) {
    return null;
  } 

  let resultType = '';

  if (matchFound.media_type === 16) {
    resultType = 'tvshow';
  } else {
    resultType = 'movie';
  }

  console.log('matchFound:', matchFound);

  return (
    <div 
      className='relative flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    > 
      <div className='absolute inset-0 bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-neutral-a50 opacity-80'></div>

      <div className='relative text-center mx-2 sm:mx-0 h-52 sm:h-96 flex items-center justify-center gap-4 rounded-b-md text-white'>
        <div className='w-1/2 flex flex-col justify-center items-center gap-y-2'>
          <h1 className='text-center font-bold text-xl pb-2 md:text-5xl bg-gradient-to-br from-dark-menu-y10 via-dark-primary-a0 to-dark-menu-y10 bg-clip-text text-transparent'
          style={{ WebkitTextStroke: '0.1px white' }}>
            Welcome to Watch Safe Cinema
          </h1>
          <p className='text-base md:text-xl'>
            Explore movies and TV shows with confidence, and know if they&apos;re free from unwanted <span className='text-dark-primary-a0 font-semibold bg-dark-menu-y10 py-0.5 px-1 rounded-md'>triggers</span>.
          </p>
          <p className='text-base md:text-xl'>
            Create an account to save your <span className='text-dark-menu-y10 font-semibold'>favorites</span>, <span className='text-dark-menu-y10 font-semibold'>wish list</span>, <span className='text-dark-menu-y10 font-semibold'>watched</span>, or <span className='text-dark-menu-y10 font-semibold'>unwanted</span> content.
          </p>
          <p className='text-base md:text-xl'>Discover everything about movies and so much more.</p>
        </div>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <div className='absolute'>
            <Image src={`https://www.doesthedogdie.com/content/1800/0/${imagePath}`} alt={nameTitle} className='object-contain rounded-md h-full w-full' width={1800} height={1800} />
          </div>
          <div className='relative from-dark-primary-a30 to-transparent bg-gradient-to-tl w-full h-full rounded-md py-5'>
            <div className='flex justify-end items-center pb-4 flex-col text-center h-full w-auto'>
              <div className='text-lg font-semibold'>{nameTitle}</div>
              <div className=''>
                <DetailsContent 
                  item={randomItem} 
                  handleModalTriggerClick={handleModalTriggerClick} handleModalVideoClick={handleModalVideoClick}
                  showModalVideo={showModalVideo} 
                  showModalTrigger={showModalTrigger}
                />
              </div>
              <Link className='flex justify-center items-center h-10 w-[30%] bg-dark-menu-y10 rounded-md hover:opacity-95 text-dark-primary-a20 mt-2 px-2 py-1' href={`/${resultType}/${matchFound.id}`}>
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

