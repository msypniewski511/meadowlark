const http = require("http");
const fs = require("fs");

function serveStaticFiles(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data) {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Error");
    } else {
      res.writeHead(responseCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

http
  .createServer(function(req, res) {
    // Normailze url by remmoving querystring, optional
    // trailing slash, and making it lowercase
    let path = req.url.replace(/\/?(?:\.*)?$/, "").toLocaleLowerCase();
    console.log("Path: " + path);
    switch (path) {
      case "":
        serveStaticFiles(res, "/public/home.html", "text/html");
        break;
      case "/about":
        serveStaticFiles(res, "/public/about.html", "text/html");
        break;
      case "/img/logo.png":
        serveStaticFiles(res, "/public/img/logo.png", "img/png");
        break;
      default:
        serveStaticFiles(res, "/public/404.html", "text/html");
        break;
    }
  })
  .listen(3000);

console.log("Server started on localhost:3000; press ctrl-C to terminate...");
