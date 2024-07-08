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
      const ids = dataQuery.items.map(item => item.id);
      if(!ids || ids.length === 0){
        throw new Error('ID not found in the first API response');
      }

      const fetchingResultsIds = async (ids) => {
        const resultsIDs = {}
        for (const id of ids) {
          try {
            const response2 = await fetch(`/api/serverDataDDDId?id=${id}`);
            if (!response2.ok) {
              throw new Error('Failed to fetch data');
            }
            const dataId = await response2.json();
            resultsIDs[id] = dataId.allGroups;
          } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
          }
        }
        console.log(resultsIDs);
        return resultsIDs;
        
      };
      const resultsIds = await fetchingResultsIds(ids);
  

      //conbine both responses
      const combinedData = dataQuery.items.map((itemQuery) => ({
        ...itemQuery,
        additionalData: resultsIds[itemQuery.id]
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
              return (
              <li key={index} className='flex gap-4 border-2 border-red-300 border-solid' >
                <div className=''>
                  <Image className='w-20 h-auto' src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={300} height={300} alt={result.name} />
                </div>
                <div className=''>
                  <h2>{result.name}</h2>
                  <p>{result.releaseYear}</p>
                  <p>{result.genre}</p>
                  
                  <div className='flex'>
                    {result.additionalData[0].topics?.concat(result.additionalData[4]?.topics || []).map((topic, index) => {
                      return (
                        <div key={index}>
                          <h2>{topic.doesName}?</h2>
                          {topic.yesSum === 0 && topic.noSum === 0 ? (
                            'no data'
                          ) : (
                              <div className='flex'>
                                <p className='bg-red-800'> Yes {topic.yesSum}</p>
                                <p className='bg-green-800'> No {topic.noSum}</p>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
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

