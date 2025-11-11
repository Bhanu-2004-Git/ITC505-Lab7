// server.js
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Serve all static files in the "public" folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// POST route for the Mad Lib
app.post('/ITC505/lab-7', (req, res) => {
  const { name, place, animal, food, hobby } = req.body;

  if (!name || !place || !animal || !food || !hobby) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out all fields.</p>
      <a href="/ITC505/lab-7/">Go Back</a>
    `);
    return;
  }

  const story = `
    Once upon a time, ${name} went to ${place} with a ${animal}.
    They enjoyed eating ${food} while talking about their favorite hobby: ${hobby}.
    It was a perfect day!
  `;

  res.send(`
    <h1>Your Mad Lib Story</h1>
    <p>${story}</p>
    <a href="/ITC505/lab-7/">Create Another Story</a>
    <footer>
      <p>Last updated: <span id="lastModified"></span></p>
    </footer>
    <script>
      var x = document.lastModified;
      document.getElementById('lastModified').textContent = x;
    </script>
  `);
});

// Default random test route
app.get('/do_a_random', (req, res) => {
  res.send('Your number is: ' + (Math.floor(Math.random() * 100) + 1));
});

// Port settings
let port = 80;
if (process.argv[2] === 'local') port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
