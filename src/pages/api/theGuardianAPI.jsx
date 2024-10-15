
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Guardian from 'guardian-js';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const apiKey = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY;

const guardianKey = new Guardian(apiKey, true);

const truncateText = (text ) => {
  const maxLength = window.innerWidth < 1024 ? 480 : 280;

  if (text.length <= maxLength) {
    return text;
  } 
  return text.slice(0, maxLength) + '...';
};

const GuardianNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme } = useTheme();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await guardianKey.content.search('cinema OR film OR movie OR tvshow OR actor', {
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


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className='px-4 md:px-8'>
      <Slider {...settings}>
        {articles.map((article) => (
          <div className='p-2' key={article.id}>
            <div className={`text-white ${theme === 'dark' ? 'bg-dark-accent-a40' : 'bg-dark-primary-a30'} rounded-md p-4 h-auto md:h-[330px] flex flex-col justify-between`}>
              <h2 className='md:text-sm xl:text-lg font-semibold h-auto md:h-14'>
                {article.webTitle}
              </h2>
              <p className='text-sm font-thin text-justify '>Published on: {new Date(article.webPublicationDate).toLocaleDateString()}</p>
              <div className='flex flex-col md:flex-row gap-2'>
                <Image src={article.fields.thumbnail} alt={article.webTitle} width={300} height={200} className='rounded-md lg:auto xl:w-[300px] h-auto object-contain'/>
                <p className='text-sm'>{truncateText(article.fields.bodyText)}</p>
              </div>
              <p className='text-sm font-thin mt-2'>
                See more at <a href={article.webUrl} target='_blank' rel='noopener noreferrer' className={`${theme === 'dark' ? 'text-dark-accent-a10 hover:text-dark-accent-a0' : 'text-dark-menu-y10 hover:text-white'}  underline font-bold`}>The Guardian</a>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GuardianNews;
