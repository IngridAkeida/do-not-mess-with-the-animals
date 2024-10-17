import Link from 'next/link';
import { useState, useMemo } from 'react';
import CardLayout from '@/components/Main/CardLayout/CardLayout';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import GeneralComponent from '@/components/uiComponents/Layouts/LayoutGeneralComponent';

const SearchResults = ({results, searchTerm}) => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const additionalStylesTitle = 'mb-2 font-bold text-xl text-center py-2 mx-2 flex justify-center rounded-md items-center';
  const additionalStylesComponent = 'flex flex-wrap justify-center p-2 gap-4 bg-gradient-to-br w-[100%] sm:w-9/12 rounded-md sm:py-4 mx-2';


  const { filteredResults, movieCount, tvShowCount } = useMemo(() => {
    let movieCount = 0;
    let tvShowCount = 0;

    const filteredResults = results.filter(result => {
      // if (result.tmdbId === null) return false;
      if (result.media_type !== 'movie' && result.media_type !== 'tv') return false;

      if (result.media_type === 'movie') movieCount++;
      if (result.media_type === 'tv') tvShowCount++;

      if (filter === 'all') return true;
      if (filter === 'movies' && result.media_type === 'movie') return true;
      if (filter === 'tvshows' && result.media_type === 'tv') return true;

      return false;
    });

    return { filteredResults, movieCount, tvShowCount };
  }, [results, filter]);

  if (!results) {
    return <h2>No results found for {searchTerm}</h2>;
  }

  return (
    <LayoutSection>
    <div className='flex flex-col px-2 py-4 sm:px-0 gap-2'>
      <GeneralComponent additionalStyles={additionalStylesTitle} >
        <span>You searched for the term <span className='font-bold text-dark-menu-y10'>{searchTerm}</span>, we found <span className='font-bold text-dark-menu-y10'>{filteredResults.length}</span> contents with that keyword, of which <span className='font-bold text-dark-menu-y10'>{movieCount}</span> are films and <span className='font-bold text-dark-menu-y10'>{tvShowCount}</span> are tv shows</span> 
      </GeneralComponent>

    <div className='flex justify-center'>
      <div className='hidden sm:block w-3/12'>
        <div className='p-4  rounded-md shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Filter by:</h3>
          <select id='filter' value={filter} onChange={handleFilterChange} className='p-2 rounded-md w-full text-white'>
            <option value='all'>All</option>
            <option value='movies'>Movies</option>
            <option value='tvshows'>TV Shows</option>
          </select>
        </div>
      </div>
      <GeneralComponent additionalStyles={additionalStylesComponent}>
        {filteredResults.map((result, index) => {

          let resultType = '';
          if (result.media_type === 'tv' ) {
            resultType = 'tvshow';
          } else {
            resultType = 'movie';
          }
          return (
          <Link key={index} href={`/${resultType}/${result.id}`}>
            <CardLayout result={result} />
          </Link>
        )})}
      </GeneralComponent>
    </div>
    
  </div>
  </LayoutSection>
  );

};

export default SearchResults;
