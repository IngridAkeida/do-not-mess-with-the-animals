import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';

function reduceText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

const SearchResults = ({results, searchTerm}) => {

  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const maxLength = 100;
  // const stylesPosterMobile ='w-64 h-auto max-h-96 object-contain rounded-md shadow-md';
  // const stylesPosterWeb ='sm:w-20 sm:max-h-60 object-contain rounded-md shadow-md';

  console.log('results', results);

  if (!results) {
    return <h2>No results found for {searchTerm}</h2>;
  }

  

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className='bg-dark-neutral-a30 flex flex-col px-2 py-4 sm:px-0 gap-2'>
      <h2 className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 font-semibold text-xl text-center bg-black rounded-md p-2 '>You searched for the term <span className='font-bold text-dark-menu-y10'>{searchTerm}</span>, we found <span className='font-bold text-dark-menu-y10'>{results.length}</span> contents with that keyword, of which <span className='font-bold text-dark-menu-y10'>x</span> are films and <span className='font-bold text-dark-menu-y10'>x</span> are tv shows</h2>

    <div className='flex justify-center'>
      <div className='hidden sm:block w-2/12'>coluna 1</div>
      <ul className=' flex flex-wrap justify-center p-2 gap-2 bg-gradient-to-br w-[100%] from-dark-primary-a40 to-dark-primary-a30 rounded-md sm:pb-8'>
      {results.map((result, index) => {

        let resultType = '';

        if (result.ItemTypeId === 16) {
          resultType = 'tvshow';
        } else {
          resultType = 'movie';
        }

        console.log('resultType', resultType);

        return (
        <Link key={index} href={`/${resultType}/${result.id}`}>
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
                                <div className='flex sm:justify-center text-center gap-1 mb-1'>
                                  <p className='bg-alert-danger-600 w-7 text-xs p-1 rounded-full'> {topic.yesSum}</p>
                                  <p className='bg-alert-success-600 w-7 text-xs p-1 rounded-full'>{topic.noSum}</p>
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
        </Link>
      )})}
    </ul>
    </div>
    
  </div>
  );

};

export default SearchResults;
