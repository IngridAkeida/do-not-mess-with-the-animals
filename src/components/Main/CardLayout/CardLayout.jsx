import Image from 'next/image';
import { FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import { useState } from 'react';
import IsFavoriteComponent from '@/components/uiComponents/IsFavorite/IsFavorite';

const CardLayout = ({result}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };

  return(
    <div className='sm:h-60 sm:w-40 relative sm:cursor-pointer'>
      <div className='absolute bg-black opacity-0 hover:opacity-80 sm:h-60 sm:w-40 rounded-xl flex justify-center items-center'>
        <div className='block sm:text-transparent sm:hover:text-white px-2 h-[80%] w-[100%]'>
          <div className='flex sm:flex-col gap-2 sm:gap-0'>
            <p className='font-bold'>{result.name || result.title}</p>
            <p className='font-thin text-sm'>({result.media_type})</p>
          </div>
          <p className='text-xs pb-1'>{result.releaseYear}</p>
          {result.genre_ids && <p>Genre: {result.genre_ids}</p>}
          <div className='text-sm flex gap-2 absolute bottom-2 sm:bottom-4 sm:left-12'>
            <span onClick={handleAddClick} className='cursor-pointer'>
              {isAdded ? <FaCheck /> : <FaPlus />}
            </span>
            <IsFavoriteComponent itemId={result.id} />
            <FaPlay />
          </div> 
          {/* ajustar esse componente asap */}
          {/* <div className=''>
            {result.additionalData && result.additionalData.length > 0 && 
              result.additionalData.map((data, index) => (
                data.name === 'Animal' && data.topics && data.topics.length > 0 && 
                  data.topics.map((topic, topicIndex) => (
                    topic.doesName === 'Does an animal die' && (
                      <div className='' key={`${index}-${topicIndex}`}>
                        <h2 className='font-light text-sm pb-1'>{topic.doesName}?</h2>

                        {topic.yesSum === 0 && topic.noSum === 0 ? (
                          'no data'
                        ) : (
                          <div className='flex sm:justify-center text-center gap-6 mb-1'>
                            <p className='flex w-7 text-xs p-1 rounded-full'><p>Yes: </p>{topic.yesSum}</p>
                            <p className='flex w-7 text-xs p-1 rounded-full'><p>No: </p>{topic.noSum}</p>
                          </div>
                        )}
                      </div>
                    )
                  ))
              ))
            }
          </div> */}
          {/* <div className='text-sm flex gap-2 absolute bottom-2 sm:bottom-4 sm:left-12'>
            <span onClick={handleAddClick} className='cursor-pointer'>
              {isAdded ? <FaCheck /> : <FaPlus />}
            </span>
            <IsFavoriteComponent itemId={result.id} />
            <FaPlay />
          </div> */}
        </div>
      </div>
      <div className='flex sm:hidden'>{result.backdrop_path === null ? (
          <Image className='rounded-xl' src='/assets/movie-nf-hor.png' width={300} height={300} alt={result.name || result.title} />
        ) : (
          <Image className='rounded-xl' src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`} width={500}
          height={750}
          priority={true} alt={result.name || result.title} />
        )}
      </div>
      <div className='hidden sm:flex h-[100%] hover:opacity-70'>{result.poster_path=== null ? (
          <Image className='rounded-xl' src='/assets/movie-nf.png' width={500} height={500} alt={result.name || result.title} />
        ) : (
          <Image className='rounded-xl' src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} width={500}
          height={750}
          priority={true} alt={result.name || result.title} />
        )}
      </div>
    </div>

  )
}

export default CardLayout;