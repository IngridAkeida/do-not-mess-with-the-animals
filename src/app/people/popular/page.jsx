'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import Subtitles from '@/components/uiComponents/Layouts/LayoutSubtitles';
import PeopleCards from '@/components/uiComponents/Layouts/LayoutPeopleCards';


const truncateText = (text ) => {
  const maxLength = window.innerWidth < 1024 ? 40 : 40;

  if (text.length <= maxLength) {
    return text;
  } 
  return text.slice(0, maxLength) + '...';
};

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

  return (
    <Layout>
      <LayoutSection>
        <div className='flex'>
          <div className='hidden sm:block w-2/12'>Coluna 1</div>
          <div className='flex flex-col sm:w-10/12'>
            <Subtitles>Popular People</Subtitles>
            <ul className='flex flex-wrap gap-2 justify-center items-center'>
              {data.results.map((person) => { 
                const key = person.id;
                return(
                <PeopleCards key={key}>
                  <Link href={`/person/${person.id}`}>
                    <div className='flex flex-col items-center text-center gap-y-1 p-2'>
                      <h2 className=''>{person.name}</h2>
                      <Image src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} width={500} height={750} priority={true}  className='h-60 w-auto rounded-md'/>
                      <p className='text-xs h-10 '>{truncateText(person.known_for.map((content) => content.title || content.name).join(', '))}</p>
                    </div>
                  </Link>
                </PeopleCards>
              )})}
            </ul>
          </div>
        </div>
      </LayoutSection>
    </Layout>
  );
}

export default PeoplePage;
