const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/feeds', (req, res) => {
  const data = req.body;
  fs.readFile(__dirname + '/../data/feeds.json', (err, content) => {
    if (err) throw err;
    const feeds = JSON.parse(content);
    feeds.unshift(data);
    fs.writeFile(__dirname + '/../data/feeds.json', JSON.stringify(feeds, null, 2), (err) => {
      if (err) throw err;
      res.status(200).end();
    });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
app.use(express.json());