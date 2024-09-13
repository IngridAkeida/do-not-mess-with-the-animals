export default async function handler(req, res) {
  const { query } = req.query;
  const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

  if (!API_TOKEN) {
    return res.status(401).json({ error: 'API TOKEN is required' });
  }

  const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${query}`;
  console.log('API URL:', apiUrl);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


