'use client';
import { useEffect, useState } from 'react';
import { getListMovieNew } from '@/pages/api/dataTMDBMovieNew';
import Layout from '@/components/uiComponents/LayoutContainer/LayoutContainer';
import Link from 'next/link';
import Image from 'next/image';

const MoviesUpComingPage = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const listPopular = await getListMovieNew();
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
      <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
        <div className='relative'>
          <div key={list[3]?.title}>
            <h1 className='text-center text-2xl p-4 text-white font-semibold'>
              Upcoming Movies
            </h1>
            <div className='flex flex-wrap flex-row gap-4 justify-center text-center items-center pb-4'>
              {list[3].items.results.map((item, index) => (
                <Link key={index} href={`/movie/${item.id}`}>
                  <div  className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 '>
                    <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='rounded-md h-80' alt={item.title} width={400} height={500}/>
                    <div className='absolute w-48'>{item.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MoviesUpComingPage;