'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListMovie } from '../../../../../pages/api/dataTMDBGenreMovie';
import Nav from '@/components/Header/Nav/Nav';
import GenreContentCard from '@/components/Main/GenresMenu/GenreContentCard/GenreContentCard';
import PageButton from '@/components/Main/GenresMenu/PageButton/PageButton';

const GenreMovie = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [genreData, setGenreData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  
  
  useEffect(() => {
    if (!slug) return;
    
    const loadAllGenres = async () => {
      try {
        setLoading(true);
        const listGenre = await getListMovie(currentPage);
        
        if (listGenre) {
          const genre = listGenre.find(item => item.slug === slug);
          setGenreData(genre);
          if (genre.items.total_pages >= 500) {
            setTotalPages(500);
          } else {
            setTotalPages(genre.items.total_pages);
          }
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
  }, [slug, currentPage]);

  useEffect(() => {
    router.push(`?page=${currentPage}`);
  }, [currentPage, slug, router]);

  if (!genreData) {
    return <div className='text-white'>Loading genre data...</div>;
  }

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }
  
  console.log('genreData', genreData);
  console.log('currentPage', currentPage);
  console.log('totalPages', totalPages);
  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <GenreContentCard genreData={genreData} />
      <PageButton currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default GenreMovie;
