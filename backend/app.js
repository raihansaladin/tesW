const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS for React frontend

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
})

app.post('/data', (req, res) => {
  console.log('Received data:', req.body);
  res.send(`Data received: ${req.body.data || 'No data provided'}`);
});

app.get('/about', (req, res) => {
  res.json({ message: "Ini endpoint About" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});