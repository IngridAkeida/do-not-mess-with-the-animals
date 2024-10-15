'use client';
import SearchResults from '@/components/Main/SearchResults/SearchResults';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;
    const handleSearch = async () => {
      try {
        const encodedTerm = encodeURIComponent(searchTerm);
        const response = await fetch(`/api/serverDataTMDBQuery?query=${encodedTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const dataQuery = await response.json();
        setResults(dataQuery.results);
      } catch (error) {
        setError(error.message);
      }
    };

    handleSearch();
  }, [searchTerm]);

  if (!results) {
    return <p>Loading...</p>;
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
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
