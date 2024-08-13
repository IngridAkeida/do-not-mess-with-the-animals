import Image from "next/image";
import GenreColors from "../../uiComponents/GenreColors/GenreColors";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Settings  from '../../uiComponents/Settings/Settings';

const BannerResult = ({item}) => {
  const backgroundImage = item.backdrop_path
  ? `https://www.doesthedogdie.com/content/1800/0/${item.backdrop_path}`
  : '/assets/movie-nf.png';

  const stylesPoster ='w-32 md:w-20 max-h-96 object-contain rounded-md shadow-md';
  const stylesSeasonPoster ='w-32 md:w-40 max-h-96 object-contain rounded-md shadow-md';

  const genreColors = GenreColors;
  const settings = Settings;

  console.log(item)

  return (
    <div>
      <div className={`flex-col flex gap-2 justify-start w-auto h-auto bg-cover bg-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='flex p-4'>
      {item.poster_path=== null ? (
          <Image className={stylesPoster} src='/assets/movie-nf.png' width={300} height={300} alt={item.name} />
        ) : (
          <Image className={stylesPoster} src={`https://www.doesthedogdie.com/content/1200/0/${item.poster_path}`} width={300} height={300} alt={item.title} />
        )}
        <div className='pl-4'>
          <h1 className='py-1 font-bold'>{item.name || item.title}</h1>
          {item.seasons && item.seasons.length > 0 ? (<p>TV show</p>) : (<p>Movie</p>)}
          <p>{item.release_date}</p>
          <p className="flex flex-wrap gap-1">{item.genres.map((genre, index) => (
              <span key={index} className={`px-1 mx-1 text-xs rounded-lg ${genreColors[genre.id]}`}>{genre.name}</span>
          ))}</p>
          {item.seasons && item.seasons.length > 0 ? (<p>Seasons: {item.number_of_seasons}
</p>) : null}
          <p>Status: {item.status}</p>
          {item.seasons && item.seasons.length > 0 ? (<p>Created By: {item.created_by[0].name}</p>) : null}
        </div>
      </div>
      <div className='px-4 bg-gradient-to-t from-black to-transparent'>
        <p className='font-bold'>{item.tagline}</p>
        <p className='font-semibold pb-4'>{item.overview}</p>
      </div>  
      </div>
      <div>
        {item.seasons && item.seasons.length > 0 ? (
         <Slider {...settings}  className='flex flex-wrap flex-row gap-4'>
          {item.seasons.map((season, index) => {
            if (season.air_date === null) {
              return null;
            }
            return(
            <li key={index} className='flex flex-col w-80 sm:w-60 p-4 rounded-md shadow-md bg-blue-500 my-2'>
              <h2 className='text-center'>{season.name}</h2>
              <div className='flex justify-center'>
                {season.poster_path=== null ? (
                  <Image className={stylesSeasonPoster} src='/assets/movie-nf.png' width={300} height={300} alt={season.name} />
                ) : (
                  <Image className={stylesSeasonPoster} src={`https://www.doesthedogdie.com/content/1200/0/${season.poster_path}`} width={300} height={300} alt={season.title} />
                )}
              </div>
              <div>
                <p>Number of Episodes: {season.episode_count}</p>
                <p>Release Data: {season.air_date}</p>
                <p>Votes: {season.vote_average}</p>
                <p>{season.overview}</p>
              </div>
            </li>
          )})}
        </Slider>): null}
      </div>
      <div>
        <p>Similar Titles:</p>
        <p>{item.similar.results.map(
          (similar, index) => (
            <span key={index}>{similar.name}</span>
          )
        )}</p>
      </div>
    </div>
  );
}

export default BannerResult;