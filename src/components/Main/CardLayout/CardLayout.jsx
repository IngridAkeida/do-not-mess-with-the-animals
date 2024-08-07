import Image from 'next/image';
import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import { useState } from 'react';

const CardLayout = ({result}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return(
    <li className='sm:h-60 sm:w-40 relative sm:cursor-pointer'>
      <div className='absolute text-left text-white bg-gradient-to-r sm:bg-gradient-to-t from-black sm:hover:from-black sm:from-transparent to-transparent h-[100%] w-[100%] rounded-md flex flex-col justify-center sm:justify-end items-start sm:text-center sm:pb-4'>
        <div className='block sm:text-transparent sm:hover:text-white px-2 h-[80%] w-[100%]'>
          <div className='flex sm:flex-col gap-2 sm:gap-0'>
            <p className='font-bold'>{result.name}</p>
            <p className='font-thin text-sm'>({result.itemType.name})</p>
          </div>
          <p className='text-xs pb-1'>{result.releaseYear}</p>
          {result.genre && <p>Genre: {result.genre}</p>}
          <div className=''>
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
                          <div className='flex sm:justify-center text-center gap-6 mb-1 border'>
                            <p className='flex w-7 text-xs p-1 rounded-full'><p>Yes: </p>{topic.yesSum}</p>
                            <p className='flex w-7 text-xs p-1 rounded-full'><p>No: </p>{topic.noSum}</p>
                          </div>
                        )}
                      </div>
                    )
                  ))
              ))
            }
          </div>
          <div className='text-sm flex gap-2 absolute bottom-2 sm:bottom-4 sm:left-12'>
            <span onClick={handleAddClick} className='cursor-pointer'>
              {isAdded ? <FaCheck /> : <FaPlus />}
            </span>
            <span onClick={handleFavoriteClick} className='cursor-pointer'>
              {isFavorited ? <FaHeart /> : <FaRegHeart />}
            </span>
            <FaPlay />
          </div>
        </div>
      </div>
      <div className='flex sm:hidden'>{result.backgroundImage === null ? (
            <Image className='rounded-xl' src='/assets/movie-nf-hor.png' width={300} height={300} alt={result.name} />
          ) : (
            <Image className='rounded-xl' src={`https://www.doesthedogdie.com/content/200/0/${result.backgroundImage}`} width={300} height={300} alt={result.name} />
          )}
        </div>
      <div className='hidden sm:flex h-[100%]'>{result.posterImage=== null ? (
          <Image className='rounded-xl' src='/assets/movie-nf.png' width={500} height={500} alt={result.name} />
        ) : (
          <Image className='rounded-xl' src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={500} height={500} alt={result.name} />
        )}
      </div>
    </li>

  )
}

export default CardLayout;