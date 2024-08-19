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
          'page-size': 1, 
          'show-fields': 'all',
          'tag': 'film/film,tone/reviews', // Adicione tags, se necessário
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
    <h1>Notícias do The Guardian</h1>
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <h2>
            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
              {article.webTitle}
            </a>
          </h2>
          <p><strong>Publicado em:</strong> {new Date(article.webPublicationDate).toLocaleDateString()}</p>
          <p><strong>Seção:</strong> {article.sectionName}</p>
          <p><strong>Pilar:</strong> {article.pillarName}</p>
          <div>
            <Image src={article.fields.thumbnail} alt={article.webTitle} width={300} height={200} />
            <p>{article.fields.trailText
            }</p>
            see more at <a href = {article.webUrl} target="_blank" rel="noopener noreferrer">The Guardian</a>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default GuardianNews;


