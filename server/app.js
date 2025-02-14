const express = require("express");
const cors = require("cors"); // 引入 CORS
const articleRoutes = require("./routes/articleRoute");
require("dotenv").config();
const app = express();
app.use(cors()); // 啟用 CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json"); // 引入自動生成的 JSON

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
//路由 localhost:port/aritcle
app.use("/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send(process.env.ENV_TEST);
});
module.exports = app;
