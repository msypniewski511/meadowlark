const http = require("http");

http
  .createServer(function(req, res) {
    console.log("Witaj zapytanie");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello World!</h1>");
  })
  .listen(3000);

console.log("Server started on localhost:3000; press ctrl-C to terminate...");
