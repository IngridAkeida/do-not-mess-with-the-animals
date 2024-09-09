'use client';
import { useEffect, useState } from "react";
import { getListMovieNew } from '@/pages/api/dataTMDBGenreMovieNew';
import Nav from '@/components/Header/Nav/Nav';
import Footer from '@/components/Footer/Footer';

const MoviesPopularPage = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const listPopular = await getListMovieNew();
        if (listPopular) {
          setList(listPopular);
          console.log(listPopular);
        } else {
          setError('Failed to load.');
        }
      } catch (e) {
        setError('Failed to load.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAllGenres();
  }, []);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>Error: {error}</div>;
  }
  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a20 to-dark-primary-a30'>
    <Nav />
      {list.map((popular, index) => (
          <div key={index} className=''>
          {/* <Link href={`/${content}/genres/genre/${genre.slug}`} passHref>  */}
            <div 
              className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out' 
            >
              <div className='text-center mt-4'>
                {popular.title}
              </div>
            </div>
          {/* </Link> */}
          </div>
        ))}
        <Footer />
    </div>
  );
}

export default MoviesPopularPage;