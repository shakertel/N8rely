export default async function handler(req, res) {
  const { q, part, type, maxResults, key } = req.query;

  if (!q || !key) {
    return res.status(400).json({ error: "Missing required parameters: q and key" });
  }

  const params = new URLSearchParams({
    part: part || 'snippet',
    q,
    type: type || 'video',
    maxResults: maxResults || '5',
    key
  });

  const youtubeURL = `https://www.googleapis.com/youtube/v3/search?${params}`;

  try {
    const response = await fetch(youtubeURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from YouTube API', details: error.message });
  }
}
