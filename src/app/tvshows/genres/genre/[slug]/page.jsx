'use client';
import { useState } from 'react';
import GenreDataFetch from '@/components/Main/GenresMenu/GenreDataFetch/GenreDataFetch';
import { getListTvShow } from '../../../../../pages/api/dataTMDBGenreTvShow';
import GenreContentCard from '@/components/Main/GenresMenu/GenreContentCard/GenreContentCard';
import PageButton from '@/components/Main/GenresMenu/PageButton/PageButton';
import Layout from '@/components/uiComponents/ConainerLayout/ContainerLayout';

const GenreTVShow = () => {
  const specificPath = getListTvShow;
  const [currentPage, setCurrentPage] = useState(1); 
  const { genreData, loading, error, totalPages } = GenreDataFetch({ currentPage, setCurrentPage, specificPath });

  // max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30

  if (!genreData) {
    return <div className='text-white'>Loading genre data...</div>;
  }

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }
  return (
    <Layout>
      <GenreContentCard genreData={genreData} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
    </Layout>
  );
};

export default GenreTVShow;
