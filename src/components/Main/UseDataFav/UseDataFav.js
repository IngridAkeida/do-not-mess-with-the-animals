'use client';
import { useEffect, useState } from "react";

const UseDataFav = ({fetchpath}) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllFavorites = async () => {
      try {
        const listPopular = await fetch(fetchpath);
        if (listPopular) {
          setList(listPopular);
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
    if (fetchpath) {
      loadAllFavorites();
    }
  }, [ fetchpath ]);

  return { list, loading, error };
}

export default UseDataFav;