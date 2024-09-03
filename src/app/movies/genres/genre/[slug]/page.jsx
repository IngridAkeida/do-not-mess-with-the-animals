'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListMovie } from '../../../../../pages/api/dataTMDBGenreMovie';
import Nav from '@/components/Header/Nav/Nav';
import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const GenreMovie = () => {
  const { slug } = useParams();
  const [genreData, setGenreData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  useEffect(() => {
    if(!slug) return;
    const loadAllGenres = async () => {
      try {
        const listGenre = await getListMovie();
        if (listGenre) {
          setGenreData(listGenre.find(item => item.slug === slug));
        } else {
          setError('Failed to load genres.');
        }
      } catch (e) {
        setError('Failed to load genres.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAllGenres();
  }, [slug]);

  if (!genreData) {
    return <div className='text-white'>Loading genre data...</div>;
  }

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }

  

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  console.log(genreData)

  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <div className='my-4 pb-4'>
        <h1 className='text-white ml-4'>Genre: {genreData.title}</h1>
        <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
          {genreData.items.results.map((movie) => {
            return(
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className='sm:h-60 sm:w-40 relative sm:cursor-pointer'>
                  <div className='absolute text-left text-white bg-gradient-to-r sm:bg-gradient-to-t from-dark-neutral-a50  sm:hover:from-dark-neutral-a50 sm:from-transparent to-transparent h-[100%] w-[100%] rounded-xl flex flex-col justify-center sm:justify-end items-start sm:text-center sm:pb-4'>
                  <div className='block sm:text-transparent sm:hover:text-white px-2 h-[80%] w-[100%]'>
                    <div className='flex sm:flex-col gap-2 sm:gap-0'>
                      <p className='font-bold'>{movie.name || movie.title}</p>
                      {/* <p className='font-thin text-sm'>({movie.itemType.name})</p> TODO: precisa tratar os dados aqui para aparecer movie ou tvshow dependendo da rota*/}
                    </div>
                    <p className='text-xs pb-1'>{movie.releaseYear || movie.release_date}</p>
                    {/* {movie.genre && <p>Genre: {movie.genre}</p>} TODO: precisa tratar os dados aqui */}
                    {/* <div className=''>
                      {movie.additionalData && movie.additionalData.length > 0 && 
                        movie.additionalData.map((data, index) => (
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
                <div className='flex sm:hidden'>{movie.backdrop_path === null ? (
                      <Image className='rounded-xl' src='/assets/movie-nf-hor.png' width={300} height={300} alt={movie.name || movie.title} />
                    ) : (
                      <Image className='rounded-xl' src={`https://www.doesthedogdie.com/content/200/0/${movie.backdrop_path}`} width={300} height={300} alt={movie.name || movie.title} />
                    )}
                </div>
                <div className='hidden sm:flex h-[100%]'>{movie.poster_path === null ? (
                    <Image className='rounded-xl' src='/assets/movie-nf.png' width={500} height={500} alt={movie.name || movie.title} />
                  ) : (
                    <Image className='rounded-xl' src={`https://www.doesthedogdie.com/content/200/0/${movie.poster_path}`} width={500} height={500} alt={movie.name || movie.title} />
                  )}
                </div>
                </div>
              </Link>
          )})}
        </div>
      </div>
    </div>
  );
};

export default GenreMovie;
