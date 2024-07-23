'use client'

import Nav from '../../../components/Header/Nav/Nav';
import BannerResult from '../../../components/Main/BannerResult/BannerResult';
import TriggerResult from '../../../components/Main/TriggerResult/TriggerResult';
import Footer from '../../../components/Footer/Footer';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Tvshow = () => {

  const { id } = useParams();
  const [combineData, setCombineData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/serverDataDDDId?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
    
      //Extrat tmdbId from url
      const tmdbId = data.item.tmdbId;

      //Fetch data from tmdb
      const tmdbData = await fetch(`/api/serverDataTMDBTvShow?id=${tmdbId}`).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

      const combineData = {
        ...data,
        tmdbData
      };

      console.log('Combined data:', combineData)

      setCombineData(combineData);
    } catch (error) {
      console.error('Fetch error:', error);
    }

  };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (!combineData) {
    return <p>Carregando...</p>;
  }

  const item = combineData.tmdbData;
  const triggers = combineData.allGroups;

  console.log('item:', item);

  return (
    <div className='max-w-7xl mx-auto bg-blue-950 text-white'>
      <Nav/>
      <main>
        <BannerResult item={item} />
        <TriggerResult triggers={triggers} item={item}/>
      </main>
      <Footer/>
    </div>
  );
}

export default Tvshow;