'use client';
import { useParams } from "next/navigation";

const GenreMovie = () => {
  const { slug } = useParams();
  console.log('slug', slug);
  
  return(
    <div>
      <h1>Genre: {slug}</h1>
    </div>
  );
};

export default GenreMovie;
