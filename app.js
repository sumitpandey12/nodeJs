const http = require("http");
const express = require("express");

const routes = require("./routes");

const app = express();

app.use((req, res, next) => {
  console.log("In Middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Another Middleware");
  res.send("<h1>Hello from express</h1>");
});

app.listen(3000);
