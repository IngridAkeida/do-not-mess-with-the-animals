'use client'

import Nav from '../../../components/Header/Nav/Nav';
import Main from '../../../components/Main/Main';
import Footer from '../../../components/Footer/Footer';

import TriggerResult from '../../../components/uiComponents/triggerResult/triggerResult';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';


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

  const backgroundImage = item.backgroundImage
    ? `https://www.doesthedogdie.com/content/1800/0/${item.backgroundImage}`
    : '/assets/movie-nf.png';

  const stylesPoster ='w-32 md:w-20 max-h-96 object-contain rounded-md shadow-md';

  return (
    <div className='max-w-7xl mx-auto bg-blue-950 text-white'>
      <Nav/>
      <main>
        <div className={`flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='flex p-4'>
          {item.posterImage === null ? (
              <Image className={stylesPoster} src='/assets/movie-nf.png' width={300} height={300} alt={item.name} />
            ) : (
              <Image className={stylesPoster} src={`https://www.doesthedogdie.com/content/200/0/${item.posterImage}`} width={300} height={300} alt={item.name} />
            )}
            <div className='pl-4'>
              <h1 className='py-1 font-bold'>{item.name}</h1>
              <p>{item.releaseYear}</p>
              <p>genre</p>
              <p>direct by: sjjsjs</p>
              <p>Written by: sjjsjs</p> 
            </div>
          </div>
          <p className='font-semibold bg-gradient-to-t from-black to-transparent px-4 pb-4'>{item.overview}</p>
        </div>
      <TriggerResult triggers={triggers} item={item}/>
      </main>
    </div>
  );
}

export default Movie;