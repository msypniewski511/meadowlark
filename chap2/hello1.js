const http = require("http");

http
  .createServer(function(req, res) {
    // Normailze url by remmoving querystring, optional
    // trailing slash, and making it lowercase
    let path = req.url.replace(/\/?(?:\.*)?$/, "").toLocaleLowerCase();
    console.log("Path: " + path);
    switch (path) {
      case "":
        res.writeHead(200, { "Content-Type": "text-plain" });
        res.end("Homepage" + path);
        break;
      case "/about":
        res.writeHead(200, { "Content-Type": "text-plain" });
        res.end("About" + path);
        break;
      default:
        res.writeHead(404, { "Content-Type": "text-plain" });
        res.end("Not Found");
        break;
    }
  })
  .listen(3000);

console.log("Server started on localhost:3000; press ctrl-C to terminate...");
