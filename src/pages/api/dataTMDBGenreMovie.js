const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const listFetch = async (keyPass) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${keyPass}`, {
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

const getListMovie = async (page = 1) => [
  {
    slug: 'action',
    title: 'Action',
    items: await listFetch(`discover/movie?with_genres=28&page=${page}`),
  },
  {
    slug: 'adventure',
    title: 'Adventure',
    items: await listFetch(`discover/movie?with_genres=12&page=${page}`),
  },
  {
    slug: 'animation',
    title: 'Animation',
    items: await listFetch(`discover/movie?with_genres=16&page=${page}`),
  },
  {
    slug: 'comedy',
    title: 'Comedy',
    items: await listFetch(`discover/movie?with_genres=35&page=${page}`),
  },
  {
    slug: 'crime',
    title: 'Crime',
    items: await listFetch(`discover/movie?with_genres=80&page=${page}`),
  },
  {
    slug: 'documentary',
    title: 'Documentary',
    items: await listFetch(`discover/movie?with_genres=99&page=${page}`),
  },
  {
    slug: 'drama',
    title: 'Drama',
    items: await listFetch(`discover/movie?with_genres=18&page=${page}`),
  },
  {
    slug: 'family',
    title: 'Family',
    items: await listFetch(`discover/movie?with_genres=10751&page=${page}`),
  },
  {
    slug: 'fantasy',
    title: 'Fantasy',
    items: await listFetch(`discover/movie?with_genres=14&page=${page}`),
  },
  {
    slug: 'history',
    title: 'History',
    items: await listFetch(`discover/movie?with_genres=36&page=${page}`),
  },
  {
    slug: 'horror',
    title: 'Horror',
    items: await listFetch(`discover/movie?with_genres=27&page=${page}`),
  },
  {
    slug: 'music',
    title: 'Music',
    items: await listFetch(`discover/movie?with_genres=10402&page=${page}`),
  },
  {
    slug: 'mystery',
    title: 'Mystery',
    items: await listFetch(`discover/movie?with_genres=9648&page=${page}`),
  },
  {
    slug: 'romance',
    title: 'Romance',
    items: await listFetch(`discover/movie?with_genres=10749&page=${page}`),
  },
  {
    slug: 'scifi',
    title: 'Sci-Fi',
    items: await listFetch(`discover/movie?with_genres=878&page=${page}`),
  },
  {
    slug: 'tv-movie',
    title: 'TV',
    items: await listFetch(`discover/movie?with_genres=10770&page=${page}`),
  },
  {
    slug: 'thriller',
    title: 'Thriller',
    items: await listFetch(`discover/movie?with_genres=53&page=${page}`),
  },
  {
    slug: 'war',
    title: 'War',
    items: await listFetch(`discover/movie?with_genres=10752&page=${page}`),
  },
  {
    slug: 'western',
    title: 'Western',
    items: await listFetch(`discover/movie?with_genres=37&page=${page}`),
  },
];

export { getListMovie };
