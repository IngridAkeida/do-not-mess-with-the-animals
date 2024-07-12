'use client'

import Nav from '../../../components/Header/Nav/Nav';
import BannerResult from '../../../components/Main/BannerResult/BannerResult';
import TriggerResult from '../../../components/Main/TriggerResult/TriggerResult';
import Footer from '../../../components/Footer/Footer';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Movie = () => {

  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/serverDataDDDId?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data);
        setDetails(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (!details) {
    return <p>Carregando...</p>;
  }

  const item = details.item;
  const triggers = details.allGroups;

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

export default Movie;