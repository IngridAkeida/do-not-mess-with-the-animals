'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';

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

  console.log(person);

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
    <Layout>
      <LayoutSection>
        <div className='flex justify-center items-center'>
          <div className='max-w-6xl gap-2'>
        <div className='flex gap-x-4 bg-dark-primary-a30 rounded-md text-white'>
          <Image 
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} 
                alt={person.name} 
                width={500}
                height={750}
                priority={true}
                className='rounded-md w-56'
              />
              <div className='my-4'>
                <h1 className='text-3xl'>{person.name}</h1>
                <p>{person.known_for_department}</p>
                <p>{person.place_of_birth}</p>
                <div>
                  <h2>known for:</h2>
                  <ul className='flex gap-x-2'>
                    <li className='w-36 h-48 bg-white rounded-md'>.</li>
                    <li className='w-36 h-48 bg-white rounded-md'>.</li>
                    <li className='w-36 h-48 bg-white rounded-md'>.</li>
                    <li className='w-36 h-48 bg-white rounded-md'>.</li>
                    <li className='w-36 h-48 bg-white rounded-md'>.</li>
                    <li className='w-36 h-48 bg-white rounded-md'>.</li>
                  </ul>
                </div>
              </div>
          </div>
          <div className='bg-dark-menu-y10 p-4'>
            <p className='text-justify text-base leading-relaxed text-gray-700 dark:text-gray-300 flex flex-col'>
              <span className='font-bold text-lg text-center pb-4 '>
                "{person.biography.split('.')[0]}"
              </span>
              <span>
                <span className='opacity-0'>{'-----'}</span>
                {person.biography.slice(person.biography.indexOf('.') + 1).split(/(\(.*?\))/g).map((text, index) => (
                  <span key={index} className={text.startsWith('(') && text.endsWith(')') ? 'font-bold' : ''}>
                    {text}
                  </span>
                ))}
              </span>
            </p>
          </div>
          </div>
        </div>
      </LayoutSection>
    </Layout>
  );
}

export default PersonPage;
