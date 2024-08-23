// src/GuardianNews.js

import React, { useState, useEffect } from 'react';
import Guardian from 'guardian-js';
import Image from 'next/image';

const apiKey = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY; 

const guardianKey = new Guardian(apiKey, false);

const GuardianNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await guardianKey.content.search('movie', {
          'page-size': 2, 
          'show-fields': 'all',
          'tag': 'film/film', 
          'order-by': 'relevance', 
          'show-tags': 'contributor' 
      });
        setArticles(response.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  console.log(articles);
  console.log(guardianKey); 

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
    <h1>News</h1>
    <ul className='flex gap-2'>
      {articles.map((article) => (
        <li className='bg-dark-primary-a40 p-2 rounded-md' key={article.id}>
          <h2>
            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
              {article.webTitle}
            </a>
          </h2>
          <p className='text-sm font-thin'>Published on: {new Date(article.webPublicationDate).toLocaleDateString()}</p>
          <div>
            <div className='flex gap-1'>
              <Image src={article.fields.thumbnail} alt={article.webTitle} width={300} height={200} className='rounded-md'/>
              <p>{article.fields.trailText}</p>
            </div>
            <p className='text-sm font-thin bottom-0'>
            See more at <a href = {article.webUrl} target="_blank" rel="noopener noreferrer">The Guardian</a>
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default GuardianNews;


