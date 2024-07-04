'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const encodedTerm = encodeURIComponent(searchTerm);
      const response = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResults(data.items);

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
      
      {results && results.length > 0 && (
        <div>
          <h2>Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className='flex'>
                <div>
                  <Image src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={200} height={350} alt={result.name} />
                </div>
                <div>
                  <h2>{result.name}</h2>
                  <p>{result.releaseYear}</p>
                  <p>{result.genre}</p>
                  <p>{result.overview}</p>
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
  );
}
