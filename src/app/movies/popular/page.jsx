'use client';
import { useEffect, useState } from "react";
import { getListMovieNew } from '@/pages/api/dataTMDBMovieNew';
import Layout from '@/components/uiComponents/LayoutPages/LayoutPages';
import Link from "next/link";

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
          console.log(listPopular);
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

  console.log(list);
  console.log(list.slice(0,2));
  return (
    <Layout>
      <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
        <div className='relative'>
          <div className='absolute top-4 right-24'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only'
                checked={toggle}
                onChange={() => setToggle(!toggle)}
              />
              <div className='block border border-dark-primary-a20 bg-dark-menu-y10 w-20 h-8 rounded-full'></div>
              <div
                className={`dot absolute left-1 top-1 bg-dark-primary-a20  w-14 h-6 px-2 rounded-full duration-300 transition ${
                  toggle ? 'transform translate-x-4' : ''
                }`}
              >{toggle ? 'Week':'Day'}</div>
            </label>
          </div>
          <div key={list[toggle ? 1 : 0]?.title}>
            <h1 className='text-center text-2xl p-4 text-white font-semibold'>
              {toggle ? 'Trending Movies' : 'Trending Movies'}
            </h1>
            <div className='flex flex-wrap flex-row gap-4 justify-center items-center pb-4'>
              {list[toggle ? 1 : 0].items.results.map((item, index) => (
                <div key={index} className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 '>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MoviesPopularPage;