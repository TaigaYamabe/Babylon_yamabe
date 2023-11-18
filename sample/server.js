const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // ここに処理を記述
    //console.log("今さらながら、ようこそ");
    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // res.write('<h1>Hello World</h1>');
    // res.end();
    server.on('request', (req, res) => {
        let url = req.url;
        if (url === '/') {
          fs.readFile('360Camera-Display-System/3D.html', 'UTF-8', (error, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
          });
        } else if (url === '/js/script.js')
          fs.readFile('360Camera-Display-System/js/script.js', 'UTF-8', (error, data) => {
            //res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
            res.end();
          });
          else if (url === '/Models/upload.glb')
          fs.readFile('360Camera-Display-System/Models/upload.glb', 'UTF-8', (error, data) => {
            //res.writeHead(200, { 'Content-Type': 'text/plain' });
            // res.write(data);
            // res.end();
          });
          else if (url === '/Models/space.glb')
          fs.readFile('360Camera-Display-System/Models/space.glb', 'UTF-8', (error, data) => {
            //res.writeHead(200, { 'Content-Type': 'text/plain' });
            // res.write(data);
            // res.end();
          });
      });
    // fs.readFile('360Camera-Display-System/3D.html','UTF-8',(error,data)=>{
    //     res.writeHead(200, {'Content-Type':'text/html'});
    //     res.write(data);
    //     res.end();
    // })
    // fs.readFile('360Camera-Display-System/script.js','UTF-8',(error,data)=>{
    //     res.writeHead(200, {'Content-Type':'text/plain'});
    //     res.write(data);
    //     res.end();
    // })

}
);

  const port = 8080;
  server.listen(port);
  console.log('Server listen on port ' + port);
