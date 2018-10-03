const express = require("express");
const fortune = require("./lib/fortune.js");
const app = express();
let counter = 0;

// Set up handlebars view engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Set public directory for assets
app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || 3000);

app.get("/", function(req, res) {
  incrementCounter(req);
  res.render("home");
});

app.get("/about", function(req, res) {
  incrementCounter(req);
  res.render("about", { fortune: fortune.getFortune() });
});

// CATCH ALL HANDLER (middleware)
// CUSTOM 404 PAGE
app.use(function(req, res, next) {
  res.status(404);
  res.render("404");
});

// CUSTOM 500 PAGE
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

function incrementCounter(req) {
  counter++;
  console.clear();
  console.log("Your IP is: " + req.connection.remoteAddress);
  console.log("You are: " + counter + " visitor.");
}

app.listen(app.get("port"), function() {
  console.clear();
  console.log(
    "Express started on: http://localhost:" +
      app.get("port") +
      "; press Ctrl-c to terminate"
  );
});
