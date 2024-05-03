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
        case '/cars':
      fs.readFile('./data/cars.json', 'utf8' , (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error reading cars data');
          return;
        }
        // const cars = JSON.parse(data);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
        return;
      });
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
})

.listen(port, () => {
  console.log(`Cek http://localhost:${port}`);
});
