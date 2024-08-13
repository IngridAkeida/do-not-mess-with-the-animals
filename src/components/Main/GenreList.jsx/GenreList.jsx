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

  const aboutGenres = {
  trending: {
    name: 'Trending',
    about: 'Discover What’s Hot Right Now! Dive into the latest movies and TV shows that everyone is talking about. From viral hits to the newest releases, catch up on the buzz and see what’s making waves in entertainment today!'
  },
  toprated: {
    name: 'Toprated',
    about: 'Experience the Best of the Best! Explore a handpicked selection of critically acclaimed movies and TV shows that have wowed audiences and critics alike. These top-rated gems are celebrated for their outstanding storytelling, exceptional performances, and unforgettable moments.'
  },
  action: {
    name: 'Action',
    about: 'Get Your Adrenaline Pumping! Immerse yourself in heart-pounding action with high-octane movies and TV shows that deliver thrilling stunts, epic battles, and non-stop excitement. Perfect for fans of edge-of-your-seat entertainment!'
  },
  comedy: {
    name: 'Comedy',
    about: 'Laugh Out Loud! Enjoy a collection of side-splitting comedies that are sure to tickle your funny bone. From witty banter to hilarious situations, these films and shows are crafted to bring joy and laughter to your screen.'
  },
  horror: {
    name: 'Horror',
    about: 'Face Your Fears! Dare to be scared with spine-chilling horror movies and TV shows that will keep you on the edge of your seat. Whether it’s supernatural thrills or psychological terror, these picks are designed to deliver a bone-rattling experience.'
  },
  romance: {
    name: 'Romance',
    about: 'Fall in Love Again! Indulge in heartwarming romance movies and TV shows that celebrate the magic of love. From sweeping love stories to touching moments, these selections will make your heart flutter and remind you of the beauty of romance.'
  }
};

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640,
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
          <ul key={index} className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 rounded-md sm:py-2 sm:flex'> 
          <div className='m-1 sm:m-2'>
            <h2 className='font-bold text-2xl'>{genre.title}</h2>
            <p className='hidden sm:block'>{aboutGenres[genre.title.toLowerCase()]?.about}</p>
          </div>
            <Slider {...settings} className='py-2 px-2 h-48 sm:px-12 sm:h-auto sm:w-[400px] md:w-[768px] border'>
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