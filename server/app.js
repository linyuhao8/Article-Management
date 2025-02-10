const express = require("express");
const cors = require("cors"); // 引入 CORS
const articleRoutes = require("./routes/articleRoute");

const app = express();
app.use(cors()); // 啟用 CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//路由 localhost:5006/aritcle
app.use("/article", articleRoutes);

module.exports = app;
