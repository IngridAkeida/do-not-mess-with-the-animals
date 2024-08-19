import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlider = ({ title, items, settings, isSeason }) => {

  const stylesSeasonPoster ='w-48 sm:w-28 sm:h-40 xl:w-48 xl:h-60 h-auto object-cover max-h-96 object-contain rounded-md shadow-md'; 

  return (
    <div>
      {items && items.length > 0 ? (
      <div>
        <p>{title}:</p>
        <Slider {...settings} className='flex flex-wrap flex-row gap-4 '>
          {items.map((item, index) => {
            if (isSeason && item.air_date === null) {
              return null;
            }
            const posterPath = item.poster_path
              ? `https://www.doesthedogdie.com/content/1200/0/${item.poster_path}`
              : '/assets/movie-nf.png';

            return (
              <li key={index} className='flex flex-col p-2 rounded-md shadow-md w-80 sm:w-60 max-h-96 justify-center items-center text-center'>
                <div className='flex justify-center'>
                  <h2 className='text-center absolute w-28 pt-2 bg-black'>{item.name || item.title}</h2>
                  <Image className={stylesSeasonPoster} src={posterPath} width={300} height={300} alt={item.name || item.title} />
                </div>
              </li>
            );
          })}
        </Slider>
      </div>
      ) : null}
    </div>
  );
};

export default CustomSlider;
