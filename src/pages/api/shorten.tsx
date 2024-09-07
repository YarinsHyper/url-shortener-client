import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { originalUrl } = req.body;
  const response = await fetch('http://localhost:3000/url/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl }),
  });
  const data = await response.json();
  res.status(200).json({ shortUrl: data.shortUrl });
}
