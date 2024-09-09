'use client';
import { Fragment, useEffect, useState } from 'react';
import Nav from '../components/Header/Nav/Nav';
import Banner from '../components/Header/Banner/Banner';
import ComponentList from '../components/Main/GenreList.jsx/GenreList';
import Footer from '../components/Footer/Footer';
import { getListMovieNew } from '@/pages/api/dataTMDBMovieNew';
import Layout from '../components/uiComponents/LayoutPages/LayoutPages';

export default function Home() {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomItem, setRandomItem] = useState(null);
  const [results, setResults] = useState(null);
  const [addVideo, setAddVideo] = useState(null);
  const [matchFoundResult, setMatchFoundResult] = useState(null);

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

  // Fetch additional data and video for the random item
  useEffect(() => {
    if (!randomItem) return;

    const fetchRandomItemDetails = async () => {
      try {
        const encodedTerm = encodeURIComponent(randomItem.name || randomItem.title);
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

    fetchRandomItemDetails();
  }, [randomItem]);

  // Fetch video data based on matched result
  useEffect(() => {
    if (matchFoundResult) {
      const tmdbId = matchFoundResult.tmdbId;
      const pathChoice = matchFoundResult.itemTypeId === 15
        ? `api/serverDataTMDBMovie?id=${tmdbId}`
        : `api/serverDataTMDBTvShow?id=${tmdbId}`;

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
  }, [matchFoundResult]);

  console.log(addVideo)

  // Find a matching result from the API response
  useEffect(() => {
    if (randomItem && results?.items?.length) {
      const matchingItem = results.items.find(item => item.tmdbId === randomItem.id);
      if (matchingItem) {
        setMatchFoundResult(matchingItem);
      } else {
        console.log('No match found for randomItem in results.');
      }
    }
  }, [randomItem, results]);

  if (loading) {
    return <div className='text-black'>Loading...</div>;
  }

  if (error) {
    return <div className='text-black'>Error: {error}</div>;
  }

  return (
    <Fragment>
      <Layout>
        <Banner randomItem={randomItem} addVideo={addVideo} matchFound={matchFoundResult} />
        <ComponentList list={list} matchFound={matchFoundResult} />
      </Layout>
    </Fragment>
  );
}
