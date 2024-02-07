const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dirName = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(express.static(path.join(dirName, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(dirName, "views", "404.html"));
});

app.listen(3000);
