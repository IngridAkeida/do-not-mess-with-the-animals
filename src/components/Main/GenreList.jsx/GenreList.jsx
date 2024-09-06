'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Settings  from '../../uiComponents/Settings/Settings';
import Carousel from './Carousel/Carousel';
import GuardianNews from '../../../pages/api/theGuardianAPI';
import Link from 'next/link';
import AboutGenre from '../../uiComponents/AboutGenre/AboutGenre';
import { NavigationInfo } from '../../uiComponents/MenuList/MenuList';
import { useState } from 'react';

const List = ({list}) => {
  const [toggle, setToggle] = useState(false);

  const aboutGenres = AboutGenre; 
  const settings = Settings;
  const navigationInfo = NavigationInfo;

  return (
    <div className='flex flex-col gap-2 mx-2 my-2 md:mx-0'>
      <h2 className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 font-semibold text-3xl text-center bg-black rounded-md p-2'> Looking for the main tredings and genres</h2>
        {/* {list.map((genre, index) => (
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
        ))} */}
        <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
            <h1 className='text-center text-2xl mb-4 text-white font-semibold'>News</h1>
            <GuardianNews />
        </div>
        <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
          <div className='relative'>
            <div className='absolute top-2 right-2'>
              <label className='inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                />
                <div className='block border border-dark-primary-a20 bg-dark-menu-y10 w-14 h-8 rounded-full'></div>
                <div
                  className={`dot absolute left-1 top-1 bg-dark-primary-a20  w-6 h-6 rounded-full duration-300 transition ${
                    toggle ? 'transform translate-x-6' : ''
                  }`}
                ></div>
              </label>
            </div>
            <div key={navigationInfo[toggle ? 1 : 0].name}>
              <h1 className='text-center text-2xl mb-4 text-white font-semibold'>
                {navigationInfo[toggle ? 1 : 0].name}
              </h1>
              <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
                {navigationInfo[toggle ? 1 : 0].subMenu.map((subItem) => (
                  <Link key={subItem.name} href={subItem.href} passHref>
                    <div className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out'>
                      <span>{subItem.icon}</span>
                      <div className='text-center mt-4'>{subItem.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
        <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
          {navigationInfo.slice(2).map((item) => (
            <div key={item.name}>
            <h1 className='text-center text-2xl mb-4 text-white font-semibold'>{item.name}</h1>
              <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
                {item.subMenu.map((subItem) => (
                <Link key={subItem.name} href={subItem.href} passHref> 
                  <div 
                    className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out' 
                  >
                    <span>{subItem.icon}</span>
                    <div className='text-center mt-4'>
                      {subItem.name}
                    </div>
                  </div>
                </Link>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
    </div>
  );
}

export default List;