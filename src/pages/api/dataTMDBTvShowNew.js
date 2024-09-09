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

  const data = await getList();
  res.status(200).json(data);
}

const getListTvShowNew = async () => [
  {
    slug: 'trending-tv',
    title: 'Trending TV Shows',
    items: await listFetch(`trending/tv/day`),
  },
  {
    slug: 'trending-tv',
    title: 'Trending TV Shows',
    items: await listFetch(`trending/tv/week`),
  },
  {
    slug: 'toprated-tv',
    title: 'Top Rated TV Shows',
    items: await listFetch(`tv/top_rated`),
  },
  {
    slug: 'ontheair-tv',
    title: 'On The Air TV Shows',
    items: await listFetch(`tv/on_the_air`),
  },
  {
    slug: 'airingtoday-tv',
    title: 'Airing Today TV Shows',
    items: await listFetch(`tv/airing_today`),
  },
];

export { getListTvShowNew };
