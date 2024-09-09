'use client';
import SearchResults from '../../components/Main/SearchResults/SearchResults';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Layout from '@/components/uiComponents/LayoutPages/LayoutPages';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term');

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

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
        const resultsIds = await Promise.all(
          ids.map(async id => {
            const response2 = await fetch(`/api/serverDataDDDId?id=${id}`);
            if (!response2.ok) {
              throw new Error('Failed to fetch data');
            }
            const dataId = await response2.json();
            return { id, allGroups: dataId.allGroups };
          })
        );

        const resultsMap = resultsIds.reduce((acc, curr) => {
          acc[curr.id] = curr.allGroups;
          return acc;
        }, {});

        const combinedData = dataQuery.items.map((itemQuery) => ({
          ...itemQuery,
          additionalData: resultsMap[itemQuery.id]
        }));

        setResults(combinedData);

      } catch (error) {
        setError(error.message);
      }
    };

    handleSearch();
  }, [searchTerm]);

  if (!results) {
    return <p>Carregando...</p>;
  }

  return (
    <Layout>
      <div>
        {error && <div>Error: {error}</div>}

        {results && results.length > 0 && (
          <SearchResults results={results} searchTerm={searchTerm} />
        )}

        {results && results.length === 0 && (
          <p>No results found.</p>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
