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

const getList = async () => [
  {
    slug: 'trending',
    title: 'Trending',
    items: await listFetch(`trending/all/week`),
  },
  {
    slug: 'toprated',
    title: 'Toprated',
    items: await listFetch(`movie/top_rated`),
  },
  {
    slug: 'action',
    title: 'Action',
    items: await listFetch(`discover/movie?with_genres=28`),
  },
  {
    slug: 'comedy',
    title: 'Comedy',
    items: await listFetch(`discover/movie?with_genres=35`),
  },
  {
    slug: 'horror',
    title: 'Horror',
    items: await listFetch(`discover/movie?with_genres=27`),
  },
  {
    slug: 'romance',
    title: 'Romance',
    items: await listFetch(`discover/movie?with_genres=10749`),
  },
  {
    slug: 'scifi',
    title: 'Sci-Fi & Fantasy',
    items: await listFetch(`discover/tv?with_genres=10765`),
  }
];

export { getList };
