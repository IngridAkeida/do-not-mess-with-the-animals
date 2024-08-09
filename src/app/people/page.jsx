'use client';
import { useEffect, useState } from 'react';
import Nav from '../../components/Header/Nav/Nav';
import Image from 'next/image';

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
      <h1>Popular People</h1>
      <ul>
        {data.results.map((person) => (
          <li key={person.id}>
            <h2>{person.name}</h2>
            <Image src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} width={200} height={300} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeoplePage;
