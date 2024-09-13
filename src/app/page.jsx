'use client';
import { Fragment, useEffect, useState } from 'react';
import Banner from '../components/Header/Banner/Banner';
import ComponentList from '../components/Main/GenreList.jsx/GenreList';
import { getListMovieNew } from '@/pages/api/dataTMDBMovieNew';
import Layout from '@/components/uiComponents/LayoutContainer/LayoutContainer';

export default function Home() {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomItem, setRandomItem] = useState(null);
  const [addVideo, setAddVideo] = useState(null);

  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const listGenres = await getListMovieNew();
        if (listGenres) {
          setList(listGenres);
          selectRandomItem(listGenres[2]?.items.results);
        } else {
          setError('Failed to load genres.');
        }
      } catch (e) {
        setError('Failed to load genres.');
        console.error(e);
      }
    };
    loadAllGenres();
  }, []);

  const selectRandomItem = (items) => {
    if (items?.length) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setRandomItem(items[randomIndex]);
    } else {
      console.log('No results found.');
    }
  };

  useEffect(() => {
    if (randomItem) {
      const id = randomItem.id;
      const pathChoice = randomItem.title
        ? `api/serverDataTMDBMovie?id=${id}`
        : `api/serverDataTMDBTvShow?id=${id}`;

      const fetchDataVideo = async () => {
        try {
          const response = await fetch(`/${pathChoice}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setAddVideo(data.videos);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDataVideo();
    }
  }, [randomItem]);

  if (loading) {
    return <div className='text-black'>Loading...</div>;
  }

  if (error) {
    return <div className='text-black'>Error: {error}</div>;
  }

  return (
    <Fragment>
      <Layout>
        <Banner randomItem={randomItem} addVideo={addVideo} />
        <ComponentList list={list} />
      </Layout>
    </Fragment>
  );
}
