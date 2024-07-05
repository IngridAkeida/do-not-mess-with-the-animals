'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function reduceText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

export default function SearchResults() {
  const router = useRouter();

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

  const handleClick = (id) => {
    router.push(`/search/${id}`);
  }

  const maxLength = 200;

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
          <h2>Results: {searchTerm}</h2>
          <ul className='flex flex-col gap-2'>
            {results.map((result, index) => (
              <li key={index} className='flex gap-4 border-2 border-red-300 border-solid' onClick={() => handleClick(result.id)}>
                <div className='w-1/6'>
                  <Image className='w-20 h-auto' src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={300} height={300} alt={result.name} />
                </div>
                <div className='w-5/6'>
                  <h2>{result.name}</h2>
                  <p>{result.releaseYear}</p>
                  <p>{result.genre}</p>
                  <p key={index}>{reduceText(result.overview, maxLength)}</p>
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

