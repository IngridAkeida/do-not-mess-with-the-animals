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
    console.error('Fetch error: ', error.message);
    return null;
  }
};

export default async function handler(req, res) {
  if (!API_TOKEN) {
    console.error('API key is missing');
    return res.status(401).json({ error: 'API key is required' });
  }

  const data = await getList();
  res.status(200).json(data);
}

const getListMovieNew = async () => [
  {
    slug: 'trending-movies-day',
    title: 'Trending Movies Day',
    items: await listFetch(`trending/movie/day`),
  },
  {
    slug: 'trending-movies-week',
    title: 'Trending Movies Week',
    items: await listFetch(`trending/movie/week`),
  },
  {
    slug: 'toprated-movies',
    title: 'Top Rated Movies',
    items: await listFetch(`movie/top_rated`),
  },
  {
    slug: 'upcoming-movies',
    title: 'Upcoming Movies',
    items: await listFetch(`movie/upcoming`),
  },
  {
    slug: 'nowplaying-movies',
    title: 'Now Playing Movies',
    items: await listFetch(`movie/now_playing`),
  },
];

export { getListMovieNew };
