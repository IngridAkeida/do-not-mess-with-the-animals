const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const listFetch = async (keyPass) => {
  const response = await fetch(`https://api.themoviedb.org/3/${keyPass}`);
  const json = await response.json();
  return json;
};

export default {
  getList: async () => {
    return [
      {
        slug: 'trending',
        title: 'Trending',
        items: await listFetch(`/trending/all/week?&api_key=${API_TOKEN}`),
      },
      {
        slug: 'toprated',
        title: 'Toprated',
        items: await listFetch(`/movie/top_rated?&api_key=${API_TOKEN}`),
      },
      {
        slug: 'action',
        title: 'Action',
        items: await listFetch(
          `/discover/movie?with_genres=28&api_key=${API_TOKEN}`
        ),
      },
      {
        slug: 'comedy',
        title: 'Comedy',
        items: await listFetch(
          `/discover/movie?with_genres=35&api_key=${API_TOKEN}`
        ),
      },
      {
        slug: 'horror',
        title: 'Horror',
        items: await listFetch(
          `/discover/movie?with_genres=27&api_key=${API_TOKEN}`
        ),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await listFetch(`/discover/movie?with_genres=10749&api_key=${API_TOKEN}`)
      },
    ];
  }};
