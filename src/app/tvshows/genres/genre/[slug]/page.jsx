'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListTvShow } from '@/pages/api/dataTMDBGenreTvShow';
import Nav from '@/components/Header/Nav/Nav';
import GenreContentCard from '@/components/Main/GenresMenu/GenreContentCard/GenreContentCard';

const GenreTVShow = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [genreData, setGenreData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  
  
  useEffect(() => {
    if(!slug) return;
    const loadAllGenres = async () => {
      try {
        setLoading(true);
        const listGenre = await getListTvShow(currentPage);
        if (listGenre) {
          const genre = listGenre.find(item => item.slug === slug);
          setGenreData(genre);
          if (genre?.items?.total_pages) {
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };


  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
      <Nav />
      <GenreContentCard genreData={genreData}/>
      <div className='flex justify-between mt-4 items-center'>
        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          Primeira Página
        </button>

        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Página Anterior
        </button>

        {/* Contador de páginas */}
        <span className='text-white'>
          Página {currentPage} de {totalPages}
        </span>

        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima Página
        </button>

        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          Última Página
        </button>
      </div>
    </div>
  );
};

export default GenreTVShow;
