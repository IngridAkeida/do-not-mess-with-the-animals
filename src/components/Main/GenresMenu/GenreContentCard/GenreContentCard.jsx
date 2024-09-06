import { FaRegHeart, FaHeart, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';
import PageButton from '@/components/Main/GenresMenu/PageButton/PageButton';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const GenreContentCard = ({ genreData, currentPage, totalPages, setCurrentPage }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredResults = genreData.items.results.sort((a, b) => {
    switch (filter) {
      case 'titleAZ':
        return a.title.localeCompare(b.title);
      case 'titleZA':
        return b.title.localeCompare(a.title);
      case 'year+':
        return new Date(a.release_date || a.first_air_date) - new Date(b.release_date || b.first_air_date);
      case 'year-':
        return new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date);
      default:
        return 0;
    }
  });

  return (
    <div className='flex'>
      <div className='w-3/12'>
        <div className='p-4 rounded-md shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Filter by:</h3>
          <select id='filter' className='p-2 rounded-md w-full text-black' onChange={handleFilterChange}>
            <option value='all'>All</option>
            <option value='titleAZ'>Title (A-Z)</option>
            <option value='titleZA'>Title (Z-A)</option>
            <option value='year+'>Year Ascendent</option>
            <option value='year-'>Year Descendent</option>
          </select>
        </div>
      </div>
      <div className='my-4 pb-4 w-9/12 flex flex-col justify-center items-center text-center'>
        <h3 className='text-white my-4 text-lg font-semibold bg-dark-primary-a40 w-[95%] px-2 rounded-md '>Genre: {genreData.title}</h3>
        <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
          {filteredResults.map((content) => {
            return (
              <Link key={content.id} href={`/content/${content.id}`}>
                <div className='sm:h-60 sm:w-40 relative sm:cursor-pointer'>
                  <div className='absolute text-left text-white bg-gradient-to-r sm:bg-gradient-to-t from-dark-neutral-a50 sm:hover:from-dark-neutral-a50 sm:from-transparent to-transparent h-[100%] w-[100%] rounded-xl flex flex-col justify-center sm:justify-end items-start sm:text-center sm:pb-4'>
                    <div className='block sm:text-transparent sm:hover:text-white px-2 h-[80%] w-[100%]'>
                      <div className='flex sm:flex-col gap-2 sm:gap-0'>
                        <p className='font-bold'>{content.name || content.title}</p>
                      </div>
                      <p className='text-xs pb-1'>{content.releaseYear || content.release_date || content.first_air_date}</p>
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
                  <div className='flex sm:hidden'>
                    {content.backdrop_path === null ? (
                      <Image className='rounded-xl' src='/assets/movie-nf-hor.png' width={300} height={300} alt={content.name || content.title} />
                    ) : (
                      <Image className='rounded-xl' src={`https://image.tmdb.org/t/p/w500${content.backdrop_path}`} width={500} height={750} priority={true} alt={content.name || content.title} />
                    )}
                  </div>
                  <div className='hidden sm:flex h-[100%]'>
                    {content.poster_path === null ? (
                      <Image className='rounded-xl' src='/assets/movie-nf.png' width={500} height={500} alt={content.name || content.title} />
                    ) : (
                      <Image className='rounded-xl' src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} width={500} height={750} priority={true} alt={content.name || content.title} />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <PageButton currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default GenreContentCard;
