import Image from "next/image";

const BannerResult = ({item}) => {
  const backgroundImage = item.backdrop_path
  ? `https://www.doesthedogdie.com/content/1800/0/${item.backdrop_path}`
  : '/assets/movie-nf.png';

  const stylesPoster ='w-32 md:w-20 max-h-96 object-contain rounded-md shadow-md';

  const genreColors = {
    28: 'bg-orange-500',    // Action
    12: 'bg-yellow-500',    // Adventure
    16: 'bg-orange-500',    // Animation
    35: 'bg-red-600',       // Comedy
    80: 'bg-red-800',       // Crime
    99: 'bg-purple-800',    // Documentary
    18: 'bg-blue-800',      // Drama
    10751: 'bg-blue-600',   // Family
    14: 'bg-teal-600',      // Fantasy
    36: 'bg-green-800',     // History
    27: 'bg-yellow-600',    // Horror
    10402: 'bg-green-600',  // Music
    9648: 'bg-purple-600',  // Mystery
    10749: 'bg-pink-600',   // Romance
    878: 'bg-indigo-600',   // Science Fiction
    10770: 'bg-gray-600',   // TV Movie
    53: 'bg-gray-800',      // Thriller
    10752: 'bg-red-700',    // War
    37: 'bg-yellow-800',    // Western
    10765: 'bg-blue-700'    //'Sci-Fi & Fantasy'
  };

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
          <h1 className='py-1 font-bold'>{item.title}</h1>
          <p>{item.release_date}</p>
          <p className="flex flex-wrap gap-1">{item.genres.map((genre, index) => (
              <span key={index} className={`px-1 mx-1 text-xs rounded-lg ${genreColors[genre.id]}`}>{genre.name}</span>
          ))}</p>
          <p>Created By: {item.created_by[0].name}</p>
          <p>Written by: sjjsjs</p> 
        </div>
      </div>
      <div className='px-4 bg-gradient-to-t from-black to-transparent'>
        <p className='font-bold'>{item.tagline}</p>
        <p className='font-semibold pb-4'>{item.overview}</p>
      </div>  
      </div>
      <div>
        <p>{item.episode_run_time}</p>
        <p>{item.status}</p>
        <p>{item.vote_average}</p>
        <p>{item.vote_count}</p>
        <p>{item.popularity}</p>
        <ul className='flex flex-wrap flex-row'>
          {item.seasons.map((season, index) => (
            <li key={index} className='flex flex-col w-80 p-4 rounded-md shadow-md bg-blue-500 my-2'>
              <h2 className='text-center'>{season.name}</h2>
              <div className='flex justify-center'>
                {season.poster_path=== null ? (
                  <Image className={stylesPoster} src='/assets/movie-nf.png' width={300} height={300} alt={season.name} />
                ) : (
                  <Image className={stylesPoster} src={`https://www.doesthedogdie.com/content/1200/0/${season.poster_path}`} width={300} height={300} alt={season.title} />
                )}
              </div>
              <div>
                <p>Number of Episodes: {season.episode_count}</p>
                <p>Release Data: {season.air_date}</p>
                <p>Votes: {season.vote_average}</p>
                <p>{season.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BannerResult;