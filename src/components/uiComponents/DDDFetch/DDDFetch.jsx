import { useState, useEffect } from 'react';
import TriggerResult from '@/components/Main/TriggerResult/TriggerResult';

const TriggerFetch = ({itemForQuery}) => {
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


  if (!results) {
    return <p>Loading...</p>;
  }
  if (!resultsFinal) {
    return <p>Loading...</p>;
  }

  const triggers = resultsFinal.allGroups;

  return (
    <div>
      <TriggerResult triggers={triggers} />
    </div>
    
  );
};

export default TriggerFetch;

