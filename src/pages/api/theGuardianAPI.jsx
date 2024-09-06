// src/GuardianNews.js

import { useState, useEffect } from 'react';
import Guardian from 'guardian-js';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const apiKey = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY;

const guardianKey = new Guardian(apiKey, false);

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

const GuardianNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await guardianKey.content.search('cinema OR film OR movie OR tv show OR actor', {
          'page-size': 10,
          'show-fields': 'all',
          'tag': 'film/film',
          'order-by': 'newest',
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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  console.log(articles);

  return (
    <div className=''>
      <Slider {...settings} className='m-1'>
        {articles.map((article) => (
          <div className='p-2 h-80 ' key={article.id}>
          <div className='bg-dark-primary-a40 rounded-md '>
            <h2 className='text-lg font-semibold h-14'>
              {article.webTitle}
            </h2>
            <p className='text-sm font-thin'>Published on: {new Date(article.webPublicationDate).toLocaleDateString()}</p>
            <div>
              <div className='flex gap-1'>
                <Image src={article.fields.thumbnail} alt={article.webTitle} width={300} height={200} className='rounded-md'/>
                <p>{truncateText(article.fields.bodyText, 300)}</p>
              </div>
              <p className='text-sm font-thin bottom-0'>
                See more at <a href={article.webUrl} target="_blank" rel="noopener noreferrer">The Guardian</a>
              </p>
            </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GuardianNews;
