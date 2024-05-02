const http = require('http');
const fs = require('fs');
const env = require('dotenv').config();
const port = process.env.PORT || 1220; 

http.createServer((req, res) => {
    switch (req.url) {
      case '/':
        req.url = 'BinarRent.html';
        break;
      case '/cars.html':
        req.url = 'cars.html';
        break;
    }
  let path = 'assets/' + req.url;
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Server is running, please open http://localhost:${port}`);
});
