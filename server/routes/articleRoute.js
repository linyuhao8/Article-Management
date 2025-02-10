const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.status(200).send("可以進入");
});

module.exports = router;
