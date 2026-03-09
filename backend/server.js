import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { openDb, initializeDatabase } from './database.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Initialize database
let db;
initializeDatabase().then(database => {
  db = database;
  console.log('Database initialized');
});

// Create short URL
app.post('/api/shorten', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Validate URL
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate short code
    const shortCode = nanoid(8);
    const id = nanoid();

    // Save to database
    await db.run(
      'INSERT INTO urls (id, original_url, short_code) VALUES (?, ?, ?)',
      [id, url, shortCode]
    );

    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    
    res.json({
      id,
      original_url: url,
      short_code: shortCode,
      short_url: shortUrl,
      clicks: 0
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect to original URL
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await db.get(
      'SELECT * FROM urls WHERE short_code = ?',
      [shortCode]
    );

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    await db.run(
      'UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?',
      [shortCode]
    );

    res.redirect(url.original_url);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all URLs
app.get('/api/urls', async (req, res) => {
  try {
    const urls = await db.all('SELECT * FROM urls ORDER BY created_at DESC');
    
    const urlsWithFullUrl = urls.map(url => ({
      ...url,
      short_url: `${req.protocol}://${req.get('host')}/${url.short_code}`
    }));
    
    res.json(urlsWithFullUrl);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});