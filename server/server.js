const express = require("express");
const cors = require("cors"); // 引入 CORS
const connectMongo = require("./config/mongoose");
const articleRoutes = require("./routes/articleRoute");

const app = express();
app.use(cors()); // 啟用 CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/article", articleRoutes);

module.exports = app;
