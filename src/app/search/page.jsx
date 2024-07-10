'use client';

import Nav from '../../components/Header/Nav/Nav';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';

import SearchResults from '../../components/uiComponents/SearchResults/SearchResults';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
          <SearchResults results={results} searchTerm={searchTerm} />
        )}

        {results && results.length === 0 && (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
