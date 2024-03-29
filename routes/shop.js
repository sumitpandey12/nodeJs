const express = require("express");
const path = require("path");
const dirName = require("../utils/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(dirName, "views", "shop.html"));
});

module.exports = router;
