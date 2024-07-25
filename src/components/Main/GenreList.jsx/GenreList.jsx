'use client';
import { useEffect, useState } from "react";
import { getList } from '../../../pages/api/dataTMDBGenre';
import Image from "next/image";

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

  return (
    <div className='text-black'>
      {list.map((genre, index) => (
        <ul key={index}> 
          <h2>{genre.title}</h2>
          <li className='flex'>
            {genre.items.results.map((item, index) => (
              <div key={index} className='border border-black w-52'>
                <p>{item.title}</p>
                <Image src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} width={300} height={450} alt={item.title} />
              </div>
            ))}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default List;