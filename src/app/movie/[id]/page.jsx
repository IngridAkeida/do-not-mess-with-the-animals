'use client'

import Nav from '../../../components/Header/Nav/Nav';
import Main from '../../../components/Main/Main';
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
        setDetails(data.item);
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

  return (
    <div>
      <Nav/>
      <h1>{details.name}</h1>
      <p>{details.overview}</p>
    </div>
  );
}

export default Movie;