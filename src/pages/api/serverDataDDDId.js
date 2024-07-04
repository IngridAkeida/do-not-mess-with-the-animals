export default async function handler(req, res) {
  const { id } = req.query;
  const API_KEY = process.env.NEXT_PUBLIC_DDD_API_KEY;

  if (!API_KEY) {
    return res.status(401).json({ error: 'API key is required' });
  }

  const apiUrl = `https://www.doesthedogdie.com/media/${id}?apikey=${API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
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
