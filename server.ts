import express from 'express';
import { kv } from '@vercel/kv';
import dotenv from 'dotenv';

// Load environment variables for local development
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/downloads', async (req, res) => {
  try {
    const count = await kv.get('mekanik_download_count') || 0;
    res.json({ count });
  } catch (error) {
    console.error('Error reading count from KV:', error);
    // If KV fails (e.g. tokens not set locally), return 0 to prevent UI crash
    res.json({ count: 0 });
  }
});

app.post('/api/downloads/increment', async (req, res) => {
  try {
    const newCount = await kv.incr('mekanik_download_count');
    res.json({ count: newCount });
  } catch (error) {
    console.error('Error incrementing count in KV:', error);
    res.status(500).json({ error: 'Failed to increment' });
  }
});

export default app;

// Start local server if we are running the local dev script
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    if (!process.env.KV_REST_API_URL) {
      console.warn("⚠️ KV_REST_API_URL is not set. Vercel KV will not work properly.");
    }
  });
}
