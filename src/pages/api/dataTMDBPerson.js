const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

export default async function handler(req, res) {
  const { id } = req.query;

  if (!API_TOKEN) {
    console.error('API key is missing');
    return res.status(401).json({ error: 'API key is required' });
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}