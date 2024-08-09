'use client';
import { useEffect, useState } from 'react';
import Nav from '../../components/Header/Nav/Nav';
import Image from 'next/image';
import Link from 'next/link';

const PeoplePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dataTMDBPeople'); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  console.log(data);

  return (
    <div className='max-w-7xl mx-auto'>
      <Nav />
      <div className='flex'>
        <div className='hidden sm:block w-2/12'>Coluna 1</div>
        <div className='flex flex-col sm:w-10/12'>
          <h1>Popular People</h1>
          <ul className='flex flex-wrap gap-2 justify-center items-center'>
            {data.results.map((person) => (
              <li className='max-w-48 bg-dark-neutral-a40 p-2' key={person.id}>
                <Link href='/person'>
                <h2>{person.name}</h2>
                <Image src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} width={200} height={300} />
                <p className='flex text-xs'>{person.known_for.map((content) => content.title || content.name).join(', ')}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PeoplePage;
