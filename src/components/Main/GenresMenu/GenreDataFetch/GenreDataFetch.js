'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const GenreDataFetcher = ({ currentPage, setCurrentPage, specificPath }) => {
  const { slug } = useParams();
  const router = useRouter();
  
  const [genreData, setGenreData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    if (!slug) return;

    const loadAllGenres = async () => {
      try {
        setLoading(true);
        const listGenre = await specificPath(currentPage);
        
        if (listGenre) {
          const genre = listGenre.find(item => item.slug === slug);
          setGenreData(genre);
          if (genre.items.total_pages >= 500) {
            setTotalPages(500);
          } else {
            setTotalPages(genre.items.total_pages);
          }
        } else {
          setError('Failed to load genres.');
        }
      } catch (e) {
        setError('Failed to load genres.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    loadAllGenres();
  }, [slug, currentPage, specificPath]);

  useEffect(() => {
    router.push(`?page=${currentPage}`);
  }, [currentPage, slug, router]);

  return { genreData, loading, error, totalPages, setCurrentPage};
};

export default GenreDataFetcher;