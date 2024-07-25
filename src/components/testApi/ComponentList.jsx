'use client';
import { useEffect, useState } from "react";
import { getList } from '../../pages/api/dataTMDBGenre';

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
    return <div className="text-black">Error: {error}</div>;
  }

  return (
    <div className="text-black">
      {list.map((genre, index) => (
        <div key={index}> 
          <h2>{genre.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default List;