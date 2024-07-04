'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const encodedTerm = encodeURIComponent(searchTerm);
      const response = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Search query</h1>
      <input
        className='text-black'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div>Error: {error}</div>}
      
      {result && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
