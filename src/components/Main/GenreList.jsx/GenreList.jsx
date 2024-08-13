'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getList } from '../../../pages/api/dataTMDBGenre';
import Settings  from '../../uiComponents/Settings/Settings';
import Carousel from './Carousel/Carousel';
import Link from 'next/link';
import AboutGenre from '../../uiComponents/AboutGenre/AboutGenre'

const List = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const aboutGenres = AboutGenre; 
  const settings = Settings;

  useEffect(() => {
    const loadAll = async () => {
      try {
        let listGenres = await getList();
        if (listGenres) {
          setList(listGenres);
          console.log('listGenres:', listGenres);
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

 

  return (
    <div className='flex flex-col gap-2 mx-2 my-2 md:mx-0'>
      <h2 className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 font-semibold text-3xl text-center bg-black rounded-md p-2'> Looking for the main tredings and genres</h2>
        {list.map((genre, index) => (
          <ul key={index} className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 rounded-md md:flex'> 
          <div className='m-1 sm:m-2 sm:w-auto'>
            <h2 className='font-bold text-md md:text-xl'>{genre.title}</h2>
            <p className='hidden md:block text-xs md:text-sm'>{aboutGenres[genre.title.toLowerCase()]?.about}</p>
          </div>
            <Slider {...settings} className='py-2 px-2 h-48 sm:px-12 sm:h-auto sm:w-[610px] md:w-[600px] md2:w-[700px] lg:w-[900px] xl:w-[1024px]'>
              {genre.items.results.map((item, index) => {
                let resultType = '';

                if (item.media_type === 'TV') {
                  resultType = 'tvshow';
                } else {
                  resultType = 'movie';
                }
                return(
                  <Link key={index} href={`/${resultType}/${item.id}`}>
                    <Carousel key={index} item={item}/>
                  </Link>
                )
              })}
            </Slider>
          </ul>
        ))}
    </div>
  );
}

export default List;