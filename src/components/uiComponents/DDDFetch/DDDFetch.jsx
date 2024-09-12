import { useState, useEffect } from 'react';

const DDDFetch = ({itemForQuery}) => {
  const [results, setResults] = useState(null);
  const [resultsFinal, setResultsFinal] = useState(null);
  const [error, setError] = useState(null);
  const [matchFoundResult, setMatchFoundResult] = useState(null);

  useEffect(() => {
    if (!itemForQuery) return;

    const fetchitemForQueryDetails = async () => {
      try {
        const encodedTerm = encodeURIComponent(itemForQuery.name || itemForQuery.title);
        const response = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const dataId = await response.json();
        setResults(dataId);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchitemForQueryDetails();
  }, [itemForQuery]);

  useEffect(() => {
    if (itemForQuery && results?.items?.length) {
      const matchingItem = results.items.find(item => item.tmdbId === itemForQuery.id);
      if (matchingItem) {
        setMatchFoundResult(matchingItem);
      } else {
        console.log('No match found for randomItem in results.');
      }
    }
  }, [itemForQuery, results]);

  useEffect(() => {
    const handleId = async () => {
      try {
        const id = matchFoundResult.id;
        const response = await fetch(`/api/serverDataDDDId?id=${id}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch data: ${errorMessage}`);
        }
        const data = await response.json();
        setResultsFinal(data);
      } catch (error) {
        setError(error.message);
      }
    };

    handleId();
  }, [ matchFoundResult ]);

  

  console.log('results:', results);
  console.log('resultsFinal:', resultsFinal);

  if (!results) {
    return <p>Carregando...</p>;
  }
  if (!resultsFinal) {
    return <p>Carregando...</p>;
  }

  const allGroups = resultsFinal.allGroups;
  

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
        {/* {results.allGroups.map((result, index) => (
          <div key={index}>
            <h2>{result.name}</h2>
          </div>
        ))} */}
        </div>
      )}
    </div>
  );
};

export default DDDFetch;
