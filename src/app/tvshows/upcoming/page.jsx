'use client';
import { getListTvShowNew } from '@/pages/api/dataTMDBTvShowNew';
import { useEffect, useState } from 'react';
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import LayoutCards from '@/components/uiComponents/Layouts/LayoutCards';
import Link from 'next/link';
import Image from 'next/image'

const TVShowsUpcomingPage = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const listPopular = await getListTvShowNew();
        if (listPopular) {
          setList(listPopular);
        } else {
          setError('Failed to load.');
        }
      } catch (e) {
        setError('Failed to load.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAllGenres();
  }, []);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }
  return (
    <Layout>
      <LayoutSection>
        <div className='relative'>
          <div key={list[3]?.name}>
            <h1 className='text-center text-2xl p-4 text-white font-semibold'>
              Up Comming TV Shows
            </h1>
            <div className='flex flex-wrap flex-row gap-4 justify-center text-center items-center pb-4'>
              {list[3].items.results.map((item, index) => (
                <Link key={index} href={`/tvshow/${item.id}`}>
                  <LayoutCards>
                    <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='rounded-md h-80' alt={item.title || item.name} width={400} height={500}/>
                    <div className='absolute w-48'>{item.title || item.name}</div>
                  </LayoutCards>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </LayoutSection>
    </Layout>
  );
}

export default TVShowsUpcomingPage;