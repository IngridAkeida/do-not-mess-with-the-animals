import Link from 'next/link';
import { useState } from 'react';
import CardLayout from '../../Main/CardLayout/CardLayout';

const SearchResults = ({results, searchTerm}) => {

  const [filter, setFilter] = useState('all');

  console.log('results', results);

  if (!results) {
    return <h2>No results found for {searchTerm}</h2>;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredResults = results.filter(result => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'movies' && result.ItemTypeId !== 16) {
      return true;
    }
    if (filter === 'tvshows' && result.ItemTypeId === 15) {
      return true;
    }
    return false;
  });

  return (
    <div className='bg-dark-neutral-a30 flex flex-col px-2 py-4 sm:px-0 gap-2'>
      <h2 className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 font-semibold text-xl text-center bg-black rounded-md p-2 '>You searched for the term <span className='font-bold text-dark-menu-y10'>{searchTerm}</span>, we found <span className='font-bold text-dark-menu-y10'>{results.length}</span> contents with that keyword, of which <span className='font-bold text-dark-menu-y10'>x</span> are films and <span className='font-bold text-dark-menu-y10'>x</span> are tv shows</h2>

    <div className='flex justify-center'>
      <div className='hidden sm:block w-2/12'>
        <div className='p-4  rounded-md shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Filter by:</h3>
          <select id='filter' value={filter} onChange={handleFilterChange} className='p-2 rounded-md w-full text-black'>
            <option value='all'>All</option>
            <option value='movies'>Movies</option>
            <option value='tvshows'>TV Shows</option>
          </select>
        </div>
      </div>
      <ul className=' flex flex-wrap justify-center p-2 gap-2 bg-gradient-to-br w-[100%] from-dark-primary-a40 to-dark-primary-a30 rounded-md sm:pb-8'>
      {filteredResults.map((result, index) => {

        let resultType = '';

        if (result.ItemTypeId === 16) {
          resultType = 'tvshow';
        } else {
          resultType = 'movie';
        }

        console.log('resultType', resultType);

        return (
        <Link key={index} href={`/${resultType}/${result.id}`}>
          <CardLayout result={result} />
        </Link>
      )})}
    </ul>
    </div>
    
  </div>
  );

};

export default SearchResults;
