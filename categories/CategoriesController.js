const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("hello categories!!");
});

module.exports = router;