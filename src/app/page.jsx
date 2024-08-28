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
  const [results, setResults] = useState(null);
  const [matchFound, setMatchFound] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const listGenres = await getList();
        if (listGenres) {
          setList(listGenres);
          displayRandomElement(listGenres[1]?.items.results);
        } else {
          setError('Failed to load genres.');
        }
      } catch (e) {
        setError('Failed to load genres.');
        console.error(e);
      }
    };

    loadAll();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!randomItem) return;

      try {
        const encodedTerm = encodeURIComponent(randomItem.name);
        const response = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const dataId = await response.json();
        setResults(dataId);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchData();
  }, [randomItem]);

  useEffect(() => {
    if (randomItem && results && Array.isArray(results.items)) {
      const matchFoundResult = results.items.find(item => item.tmdbId === randomItem.id);
  
      if (matchFoundResult) {
        setMatchFound(matchFoundResult);
      } else {
        console.log('No match found for randomItem and results.');
      }
    }
  }, [randomItem, results]);


  if (error) {
    return <div className='text-black'>Error: {error}</div>;
  }

  function displayRandomElement(resultsTmdb) {
    if (resultsTmdb && resultsTmdb.length > 0) {
      const randomIndex = Math.floor(Math.random() * resultsTmdb.length);
      setRandomItem(resultsTmdb[randomIndex]);
    } else {
      console.log('No results found.');
    }
  }

  console.log('list:', list);
  console.log('randomItem:', randomItem);
  console.log('results:', results);

  return (
    <div className='max-w-7xl mx-auto h-96'>
      <Nav />
      <Banner randomItem={randomItem} matchFound={matchFound} />
      <ComponentList list={list} />
      <Footer />
    </div>
  );
}
