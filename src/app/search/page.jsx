'use client';

import Nav from '../../components/Header/Nav/Nav';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function reduceText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...(See More)';
};

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const asPath = router.asPath;
  const searchTerm = searchParams.get('term');

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const encodedTerm = encodeURIComponent(searchTerm);
        const response1 = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);
        if (!response1.ok) {
          throw new Error('Failed to fetch data');
        }
        const dataQuery = await response1.json();
        const ids = dataQuery.items.map(item => item.id);
        if (!ids || ids.length === 0) {
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

        const combinedData = dataQuery.items.map((itemQuery) => ({
          ...itemQuery,
          additionalData: resultsIds[itemQuery.id]
        }));

        setResults(combinedData);
        console.log(combinedData);

      } catch (error) {
        setError(error.message);
      }
    };

    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  const maxLength = 200;

  return (
    <div>
      <Nav />
      <Main />
      <Footer />
      <h1>Search Result Details</h1>
      <p>Query: {JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>
      <p>URL Path: {asPath}</p>
      <p>Search Query: {searchTerm}</p>
      <div>
        {error && <div>Error: {error}</div>}

        {results && results.length > 0 && (
          <div>
            <h2>Results: {searchTerm}</h2>
            <ul className='flex flex-col gap-2'>
              {results.map((result, index) => (
                <li key={index} className='p-2 flex flex-col items-center justify-center md:flex-row gap-4 border-2 border-red-300 border-solid'>
                  {result.posterImage === null ? (
                    <Image className='w-64 md:w-20 h-auto' src='/assets/movie-nf.png' width={300} height={300} alt={result.name} />
                  ) : (
                    <Image className='w-64 md:w-20 h-auto' src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={300} height={300} alt={result.name} />
                  )}
                  <div className=''>
                    <h2 className='text-base text-center font-bold'>{result.name}</h2>
                    <p>Release data: {result.releaseYear}</p>
                    {result.genre && <p>Genre: {result.genre}</p>}
                    <div className='flex'>
                      {result.additionalData && result.additionalData.length > 0 && 
                        result.additionalData.map((data, index) => (
                          data.name === 'Animal' && data.topics && data.topics.length > 0 && 
                            data.topics.map((topic, topicIndex) => (
                              topic.doesName === 'Does an animal die' && (
                                <div key={`${index}-${topicIndex}`}>
                                  <h2>{topic.doesName}</h2>
                                  {topic.yesSum === 0 && topic.noSum === 0 ? (
                                    'no data'
                                  ) : (
                                    <div className='flex'>
                                      <p className='bg-red-800'> Yes {topic.yesSum}</p>
                                      <p className='bg-green-800'> No {topic.noSum}</p>
                                    </div>
                                  )}
                                </div>
                              )
                            ))
                        ))
                      }
                    </div>
                    <p>Overview: {reduceText(result.overview, maxLength)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {results && results.length === 0 && (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
