const express = require('express');
const app = express();
const fs = require('fs');
const getFileStat = require('util').promisify(fs.stat);

app.use(express.static('public'));

app.get('/audio', async function(req, res) {
  const filePath = './audio/music.mp3';

  const stat = await getFileStat(filePath);

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });

  const stream = fs.createReadStream(filePath);
  stream.on('end', () => console.log('Finished sending file'));

  stream.pipe(res);
});

app.listen(3000, function() {
  console.log('App running on port 3000');
});
