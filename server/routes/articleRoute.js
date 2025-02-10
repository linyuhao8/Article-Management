const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");
// 中介軟體：可以用來調試或者統一處理每個路由
router.use("/", (req, res, next) => {
  console.log("正在使用 articleRoutes");
  next();
});
//測試路由 Get /article/test
router.get("/test", articleController.test);
//新增文章 Post /article/add
router.post("/add", articleController.createArticle);

module.exports = router;
