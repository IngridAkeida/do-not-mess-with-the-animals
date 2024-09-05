const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const listFetch = async (keyPass, page = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${keyPass}page=${page}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Fetch error: ", error.message);
    return null;
  }
};

export default async function handler(req, res) {
  if (!API_TOKEN) {
    console.error('API key is missing');
    return res.status(401).json({ error: 'API key is required' });
  }

  const data = await getListMovie();
  res.status(200).json(data);
}

const getListMovie = async () => [
  {
    slug: 'action',
    title: 'Action',
    items: await listFetch(`discover/movie?with_genres=28`, page),
  },
  {
    slug: 'adventure',
    title: 'Adventure',
    items: await listFetch(`discover/movie?with_genres=12`, page),
  },
  {
    slug: 'animation',
    title: 'Animation',
    items: await listFetch(`discover/movie?with_genres=16`, page),
  },
  {
    slug: 'comedy',
    title: 'Comedy',
    items: await listFetch(`discover/movie?with_genres=35`, page),
  },
  {
    slug: 'crime',
    title: 'Crime',
    items: await listFetch(`discover/movie?with_genres=80`, page),
  },
  {
    slug: 'documentary',
    title: 'Documentary',
    items: await listFetch(`discover/movie?with_genres=99`, page),
  },
  {
    slug: 'drama',
    title: 'Drama',
    items: await listFetch(`discover/movie?with_genres=18`, page),
  },
  {
    slug: 'family',
    title: 'Family',
    items: await listFetch(`discover/movie?with_genres=10751`, page),
  },
  {
    slug: 'fantasy',
    title: 'Fantasy',
    items: await listFetch(`discover/movie?with_genres=14`, page),
  },
  {
    slug: 'history',
    title: 'History',
    items: await listFetch(`discover/movie?with_genres=36`, page),
  },
  {
    slug: 'horror',
    title: 'Horror',
    items: await listFetch(`discover/movie?with_genres=27`, page),
  },
  {
    slug: 'music',
    title: 'Music',
    items: await listFetch(`discover/movie?with_genres=10402`, page),
  },
  {
    slug: 'mystery',
    title: 'Mystery',
    items: await listFetch(`discover/movie?with_genres=9648`, page),
  },
  {
    slug: 'romance',
    title: 'Romance',
    items: await listFetch(`discover/movie?with_genres=10749`, page),
  },
  {
    slug: 'scifi',
    title: 'Sci-Fi',
    items: await listFetch(`discover/movie?with_genres=878`, page),
  },
  {
    slug: 'tv-movie',
    title: 'TV',
    items: await listFetch(`discover/movie?with_genres=10770`, page),
  },
  {
    slug: 'thriller',
    title: 'Thriller',
    items: await listFetch(`discover/movie?with_genres=53`, page),
  },
  {
    slug: 'war',
    title: 'War',
    items: await listFetch(`discover/movie?with_genres=10752`, page),
  },
  {
    slug: 'western',
    title: 'Western',
    items: await listFetch(`discover/movie?with_genres=37`, page),
  },
];

export { getListMovie };
