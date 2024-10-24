'use client';
import { useEffect, useState } from 'react';
import { getListMovieNew } from '@/pages/api/dataTMDBMovieNew';
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import LayoutCards from '@/components/uiComponents/Layouts/LayoutCards';
import Link from 'next/link';
import Image from 'next/image';

const MoviesPopularPage = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

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
      <LayoutSection>
        <div className='relative'>
          <div className='absolute top-4 right-24'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only'
                checked={toggle}
                onChange={() => setToggle(!toggle)}
              />
              <div className='block border border-dark-primary-a20 bg-dark-menu-y10 w-28 h-8 rounded-full'></div>
              <div
                className={`dot absolute left-1 top-1 bg-dark-primary-a20 w-14 h-6 px-2 text-center rounded-full duration-300 transition ${
                  toggle ? 'transform translate-x-12' : ''
                }`}
              >{toggle ? 'Week':'Day'}</div>
            </label>
          </div>
          <div key={list[toggle ? 1 : 0]?.title}>
            <h1 className='text-center text-2xl p-4 text-white font-semibold'>
              {toggle ? 'Trending Movies' : 'Trending Movies'}
            </h1>
            <div className='flex flex-wrap flex-row gap-4 justify-center text-center items-center pb-4'>
              {list[toggle ? 1 : 0].items.results.map((item, index) => (
                <Link key={index} href={`/movie/${item.id}`}>
                  <LayoutCards>
                    <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='rounded-md h-80' alt={item.title} width={400} height={500}/>
                    <div className='absolute w-48'>{item.title}</div>
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

export default MoviesPopularPage;