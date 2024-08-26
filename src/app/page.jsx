'use client';

import Nav from '../components/Header/Nav/Nav';
import Banner from '../components/Header/Banner/Banner';
import Footer from '../components/Footer/Footer';
import ComponentList from '../components/Main/GenreList.jsx/GenreList';
import { useEffect, useState } from 'react';
import { getList } from '../pages/api/dataTMDBGenre';

export default function Home() {

  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [randomItem, setRandomItem] = useState(null);
  

  useEffect(() => {
    const loadAll = async () => {
      try {
        let listGenres = await getList();
        if (listGenres) {
          setList(listGenres);
          console.log('listGenres:', listGenres);

          displayRandomElement(listGenres[0]?.items.results);
        } else {
          setError('Failed to load genres.');
        }
      } catch (e) {
        setError('Failed to load genres.');
        console.error(e);
      }
    }
    loadAll();
  }, []);

  if (error) {
    return <div className='text-black'>Error: {error}</div>;
  }

  function displayRandomElement(results) {
    if (results && results.length > 0) {
      const randomIndex = Math.floor(Math.random() * results.length);
      console.log('Random result:', results[randomIndex]);
      setRandomItem(results[randomIndex]);
    } else {
      console.log('No results found.');
    }
  }

  
  
  return (
    <div className='max-w-7xl mx-auto h-96'>
      <Nav />
      <Banner randomItem={randomItem}/>
      <ComponentList list={list}/>
      <Footer />
    </div>
  );
}

