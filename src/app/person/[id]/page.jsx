'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from '../../../components/Header/Nav/Nav';
import Image from 'next/image';

const PersonPage = () => {
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return; 

    const fetchPerson = async () => {
      try {
        const response = await fetch(`/api/dataTMDBPerson?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (!person) {
    return <div>No data found</div>;
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <Nav />
      <div className='flex'>
        <div>
          <h1 className='text-3xl'>{person.name}</h1>
          <p>{person.known_for_department}</p>
          <p>{person.place_of_birth}</p>
          <Image 
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} 
            alt={person.name} 
            width={500}
                              height={750}
                              priority={true}
          />
        </div>
      
      <p className='text-justify '>{person.biography}</p>
      </div>
      
    </div>
  );
}

export default PersonPage;
