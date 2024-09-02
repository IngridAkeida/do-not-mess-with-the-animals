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

  const data = await getListTvShow();
  res.status(200).json(data);
}

const getListTvShow = async () => [
  {
    slug: 'action-adventure-tv',
    title: 'Action & Adventure',
    items: await listFetch(`discover/tv?with_genres=10759`),
  },
  {
    slug: 'animation-tv',
    title: 'Animation',
    items: await listFetch(`discover/tv?with_genres=16`),
  },
  {
    slug: 'comedy-tv',
    title: 'Comedy',
    items: await listFetch(`discover/tv?with_genres=35`),
  },
  {
    slug: 'crime-tv',
    title: 'Crime',
    items: await listFetch(`discover/tv?with_genres=80`),
  },
  {
    slug: 'documentary-tv',
    title: 'Documentary',
    items: await listFetch(`discover/tv?with_genres=99`),
  },
  {
    slug: 'drama-tv',
    title: 'Drama',
    items: await listFetch(`discover/tv?with_genres=18`),
  },
  {
    slug: 'family-tv',
    title: 'Family',
    items: await listFetch(`discover/tv?with_genres=10751`),
  },
  {
    slug: 'kids-tv',
    title: 'Kids',
    items: await listFetch(`discover/tv?with_genres=10762`),
  },
  {
    slug: 'mystery-tv',
    title: 'Mystery',
    items: await listFetch(`discover/tv?with_genres=9648`),
  },
  {
    slug: 'news-tv',
    title: 'News',
    items: await listFetch(`discover/tv?with_genres=10763`),
  },
  {
    slug: 'reality-tv',
    title: 'Reality',
    items: await listFetch(`discover/tv?with_genres=10764`),
  },
  {
    slug: 'scifi-fantasy-tv',
    title: 'Sci-Fi & Fantasy',
    items: await listFetch(`discover/tv?with_genres=10765`),
  },
  {
    slug: 'soap-tv',
    title: 'Soap',
    items: await listFetch(`discover/tv?with_genres=10766`),
  },
  {
    slug: 'talk-tv',
    title: 'Talk',
    items: await listFetch(`discover/tv?with_genres=10767`),
  },
  {
    slug: 'war-politics-tv',
    title: 'War & Politics',
    items: await listFetch(`discover/tv?with_genres=10768`),
  },
  {
    slug: 'western-tv',
    title: 'Western',
    items: await listFetch(`discover/tv?with_genres=37`),
  },
];

export { getListTvShow };
