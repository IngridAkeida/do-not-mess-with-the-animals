'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getList } from '../../../pages/api/dataTMDBGenre';
import { NextArrow, PrevArrow } from './ArrowCarousel/ArrowCarousel';
import Carousel from './Carousel/Carousel';
import Link from 'next/link';


const List = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      
    ]
  };

  return (
    <div className='flex flex-col gap-2 mx-2 my-2 md:mx-0'>
      <h2 className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 font-semibold text-3xl text-center bg-black rounded-md p-2'> Looking for the main tredings and genres</h2>
        {list.map((genre, index) => (
          <ul key={index} className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 rounded-md sm:pb-8'> 
            <h2 className='font-bold mx-2 sm:mx-12 mt-2 sm:mt-4 text-blue-50 text-2xl'>{genre.title}</h2>
            <Slider {...settings} className='py-2 px-2 sm:px-12 h-48 sm:h-auto'>
              {genre.items.results.map((item, index) => {
                let resultType = '';

                if (item.media_type === 'TV') {
                  resultType = 'tvshow';
                } else {
                  resultType = 'movie';
                }
                return(
                  <Link key={index} href={`/${resultType}/${item.id}`}>
                    <Carousel key={index} item={item} />
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