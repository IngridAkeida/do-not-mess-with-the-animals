'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`/api/serverDataDDDId?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResult(data);
      console.log(data)
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = () => {
    fetchData(10752); 
  };

  console.log(setResult)
  

  return (
    <div>
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

