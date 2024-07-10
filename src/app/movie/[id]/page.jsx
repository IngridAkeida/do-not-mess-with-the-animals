'use client'

import Nav from '../../../components/Header/Nav/Nav';
import Main from '../../../components/Main/Main';
import Footer from '../../../components/Footer/Footer';

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

  const backgroundImage = item.backgroundImage
    ? `https://www.doesthedogdie.com/content/1800/0/${item.backgroundImage}`
    : '/assets/movie-nf.png';

  const stylesPoster ='pt-4 ml-4 w-32 md:w-20 max-h-96 object-contain rounded-md shadow-md';

  return (
    <div className='max-w-7xl mx-auto'>
      <Nav/>
      <main>
      <div className=''>
      <h1 className='font-bold'>{item.name}</h1>
        <div className={`flex-col justify-start w-auto h-96 bg-cover bg-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
          {item.posterImage === null ? (
              <Image className={stylesPoster} src='/assets/movie-nf.png' width={300} height={300} alt={item.name} />
            ) : (
              <Image className={stylesPoster} src={`https://www.doesthedogdie.com/content/200/0/${item.posterImage}`} width={300} height={300} alt={item.name} />
            )}
            <p className='font-semibold text-white bg-gradient-to-t from-black to-transparent'>{item.overview}</p>
        </div>
        <div>
        <p>Release data: {item.releaseYear}</p>
        genero
        diretor
        escritor 
        </div>
      </div>
      <div>
        triggers
      </div>
        
      </main>
    </div>
  );
}

export default Movie;