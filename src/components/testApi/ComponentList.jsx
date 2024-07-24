'use client';
import { useEffect, useState } from "react";
import dataTMDBGenre from '../../pages/api/dataTMDBGenre';

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      let listGenres = await dataTMDBGenre.getList();
      setList(listGenres);
      console.log(listGenres);
    }
    loadAll();
  }, []);

  return (
    <div className="text-black">
      {list.map((item, key)=>(
        <div key={key}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default List;