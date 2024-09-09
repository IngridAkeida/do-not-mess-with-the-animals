'use client';
import { useState } from 'react';
import GenreDataFetch from '@/components/Main/GenresMenu/GenreDataFetch/GenreDataFetch';
import { getListMovie } from '../../../../../pages/api/dataTMDBGenreMovie';
import GenreContentCard from '@/components/Main/GenresMenu/GenreContentCard/GenreContentCard';
import Layout from '../components/uiComponents/LayoutPages/LayoutPages';


const GenreMovie = () => {

  const specificPath = getListMovie;
  const [currentPage, setCurrentPage] = useState(1); 
  const { genreData, loading, error, totalPages } = GenreDataFetch({ currentPage, setCurrentPage, specificPath });

  if (!genreData) {
    return <div className='text-white'>Loading genre data...</div>;
  }

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }
  console.log(genreData);
  return (
    <Layout>
      <GenreContentCard genreData={genreData} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </Layout>
  );
};

export default GenreMovie;
