import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const GenreContentCard = ({ genreData }) => {

  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className='my-4 pb-4'>
        <h1 className='text-white ml-4'>Genre: {genreData.title}</h1>
        <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
          {genreData.items.results.map((content) => {
            return(
              <Link key={content.id} href={`/content/${content.id}`}>
                <div className='sm:h-60 sm:w-40 relative sm:cursor-pointer'>
                  <div className='absolute text-left text-white bg-gradient-to-r sm:bg-gradient-to-t from-dark-neutral-a50  sm:hover:from-dark-neutral-a50 sm:from-transparent to-transparent h-[100%] w-[100%] rounded-xl flex flex-col justify-center sm:justify-end items-start sm:text-center sm:pb-4'>
                  <div className='block sm:text-transparent sm:hover:text-white px-2 h-[80%] w-[100%]'>
                    <div className='flex sm:flex-col gap-2 sm:gap-0'>
                      <p className='font-bold'>{content.name || content.title}</p>
                      {/* <p className='font-thin text-sm'>({content.itemType.name})</p> TODO: precisa tratar os dados aqui para aparecer content ou tvshow dependendo da rota*/}
                    </div>
                    <p className='text-xs pb-1'>{content.releaseYear || content.release_date || content.first_air_date
                    }</p>
                    {/* {content.genre && <p>Genre: {content.genre}</p>} TODO: precisa tratar os dados aqui */}
                    {/* <div className=''>
                      {content.additionalData && content.additionalData.length > 0 && 
                        content.additionalData.map((data, index) => (
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
                    </div> TODO: conectar mofal de trigger aqui?*/}
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
                <div className='flex sm:hidden'>{content.backdrop_path === null ? (
                      <Image className='rounded-xl' src='/assets/content-nf-hor.png' width={300} height={300} alt={content.name || content.title} />
                    ) : (
                      <Image className='rounded-xl' src={`https://www.doesthedogdie.com/content/200/0/${content.backdrop_path}`} width={300} height={300} alt={content.name || content.title} />
                    )}
                </div>
                <div className='hidden sm:flex h-[100%]'>{content.poster_path === null ? (
                    <Image className='rounded-xl' src='/assets/content-nf.png' width={500} height={500} alt={content.name || content.title} />
                  ) : (
                    <Image className='rounded-xl' src={`https://www.doesthedogdie.com/content/200/0/${content.poster_path}`} width={500} height={500} alt={content.name || content.title} />
                  )}
                </div>
                </div>
              </Link>
          )})}
        </div>
      </div>
  );
};

export default GenreContentCard;