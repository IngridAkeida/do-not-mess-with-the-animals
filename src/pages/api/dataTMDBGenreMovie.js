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

const getListMovie = async () => [
  {
    slug: 'action',
    title: 'Action',
    items: await listFetch(`discover/movie?with_genres=28`),
  },
  {
    slug: 'adventure',
    title: 'Adventure',
    items: await listFetch(`discover/movie?with_genres=12`),
  },
  {
    slug: 'animation',
    title: 'Animation',
    items: await listFetch(`discover/movie?with_genres=16`),
  },
  {
    slug: 'comedy',
    title: 'Comedy',
    items: await listFetch(`discover/movie?with_genres=35`),
  },
  {
    slug: 'crime',
    title: 'Crime',
    items: await listFetch(`discover/movie?with_genres=80`),
  },
  {
    slug: 'documentary',
    title: 'Documentary',
    items: await listFetch(`discover/movie?with_genres=99`),
  },
  {
    slug: 'drama',
    title: 'Drama',
    items: await listFetch(`discover/movie?with_genres=18`),
  },
  {
    slug: 'family',
    title: 'Family',
    items: await listFetch(`discover/movie?with_genres=10751`),
  },
  {
    slug: 'fantasy',
    title: 'Fantasy',
    items: await listFetch(`discover/movie?with_genres=14`),
  },
  {
    slug: 'history',
    title: 'History',
    items: await listFetch(`discover/movie?with_genres=36`),
  },
  {
    slug: 'horror',
    title: 'Horror',
    items: await listFetch(`discover/movie?with_genres=27`),
  },
  {
    slug: 'music',
    title: 'Music',
    items: await listFetch(`discover/movie?with_genres=10402`),
  },
  {
    slug: 'mystery',
    title: 'Mystery',
    items: await listFetch(`discover/movie?with_genres=9648`),
  },
  {
    slug: 'romance',
    title: 'Romance',
    items: await listFetch(`discover/movie?with_genres=10749`),
  },
  {
    slug: 'scifi',
    title: 'Sci-Fi',
    items: await listFetch(`discover/movie?with_genres=878`),
  },
  {
    slug: 'tv-movie',
    title: 'TV',
    items: await listFetch(`discover/movie?with_genres=10770`),
  },
  {
    slug: 'thriller',
    title: 'Thriller',
    items: await listFetch(`discover/movie?with_genres=53`),
  },
  {
    slug: 'war',
    title: 'War',
    items: await listFetch(`discover/movie?with_genres=10752`),
  },
  {
    slug: 'western',
    title: 'Western',
    items: await listFetch(`discover/movie?with_genres=37`),
  },
];

export { getListMovie };
