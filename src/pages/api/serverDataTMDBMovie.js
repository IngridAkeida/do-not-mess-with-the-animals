export default async function handler(req, res) {
  const { id } = req.query;
  const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

  if (!API_TOKEN) {
    console.error('API key is missing');
    return res.status(401).json({ error: 'API key is required' });
  }

  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=en-US&append_to_response=credits,videos,reviews,similar`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch data from TMDB', response.status, response.statusText);
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
  console.error("Fetch error:", error);
  res.status(500).json({ error: `Server error: ${error.message}` });
}
}