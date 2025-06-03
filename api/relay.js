const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/relay', async (req, res) => {
  const { url, method = 'GET', headers = {}, body = null } = req.body;

  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).send('Access denied');
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err.toString() });
  }
});

module.exports = app;
