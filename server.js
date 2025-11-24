const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint example
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Google TTS Proxy
app.get('/api/tts', (req, res) => {
  const text = req.query.text;
  if (!text) {
    return res.status(400).send('Missing text query parameter');
  }

  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(text)}`;

  // Use native https module to fetch and pipe
  const https = require('https');
  https.get(url, (externalRes) => {
    res.setHeader('Content-Type', 'audio/mpeg');
    externalRes.pipe(res);
  }).on('error', (e) => {
    console.error(e);
    res.status(500).send('Error fetching TTS');
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
