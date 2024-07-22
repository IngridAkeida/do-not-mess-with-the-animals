'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`/api/serverDataTMDBTvShow?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data TMDB');
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = () => {
    fetchData(1622); 
  };

  return (
    <div className='text-black'>
      <button onClick={handleClick}>Fetch Data</button>

      {error && <div>Error: {error}</div>}
      
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

