'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

//reduce text size to fit in the card
function reduceText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

//Sumirize the stats
// function summarizeStats(stats) {
//   let totalYes = 0;
//   let totalNo = 0;

//   for (const key in stats.topics) {
//     const topic = stats.topics[key];
//     if (topic.definitelyYes === 1) {
//       totalYes += 1;
//     }
//     if (topic.definitelyNo === 1) {
//       totalNo += 1;
//     }
//   }

//   return { totalYes, totalNo };
// }

export default function SearchResults() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const encodedTerm = encodeURIComponent(searchTerm);
      const response1 = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);
      if (!response1.ok) {
        throw new Error('Failed to fetch data');
      }
      const dataQuery = await response1.json();
      const id = dataQuery.items[0].id;
      console.log(dataQuery.items[0].id)
      // setResults(data.items);

      if(!id){
        throw new Error('ID not found in the first API response');
      }

      //second api call idApi
      const response2 = await fetch(`/api/serverDataDDDId?id=${id}`);
      if (!response2.ok) {
        throw new Error('Failed to fetch data');
      }
      const dataId = await response2.json();
      console.log(dataId);

      //conbine both responses
      const combinedData = dataQuery.items.map((itemQuery) => ({
        ...itemQuery,
        additionalData: dataId.allGroups
      }));

      setResults(combinedData);
      console.log(combinedData)

    } catch (error) {
      setError(error.message);
    }
  };

  // const handleClick = (id) => {
  //   router.push(`/search/${id}`);
  // }

  const maxLength = 200;

  return (
    <div>
      <h1>Search real</h1>
      <input
        className='text-black'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div>Error: {error}</div>}
      
      {results && results.length > 0 && (
        <div>
          <h2>Results: {searchTerm}</h2>
          <ul className='flex flex-col gap-2'>
            {results.map((result, index) => {

              {/* const { totalYes, totalNo } = summarizeStats(result.stats); */}

              return (
              <li key={index} className='flex gap-4 border-2 border-red-300 border-solid' >
                <div className=''>
                  <Image className='w-20 h-auto' src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={300} height={300} alt={result.name} />
                </div>
                <div className=''>
                  <h2>{result.name}</h2>
                  <p>{result.releaseYear}</p>
                  <p>{result.genre}</p>
                  {/* <p>animal violence? Yes: {totalYes}, No: {totalNo}</p> */}
                  {/* <p>{result.stats}</p> */}
                  <p>{result.stats}</p>
                  <p>{reduceText(result.overview, maxLength)}</p>
                </div>
              </li>
            )})}
          </ul>
        </div>
      )}

      {results && results.length === 0 && (
        <p>No results found.</p>
      )}

    </div>
  );
}

