const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");
// 中介軟體：可以用來調試或者統一處理每個路由
router.use("/", (req, res, next) => {
  console.log("正在使用 articleRoutes");
  next();
});
//測試路由 Get /article/test
router.get(
  "/test",
  /* #swagger.ignore = true */
  articleController.test
);
//新增文章 Post /article/add
router.post(
  "/add",
  /* #swagger.tags = ['Add Post'] 
  #swagger.description = '新增文章' */
  /* #swagger.responses[200] = { 
      schema: { {
  "title": "測試文章1",
  "content": "su3sadas",
  "slug": "test",
  "category": "67aab8036617bc5e0bd7c06c",
  "status": "draft",
  "tags": [
    "67aab8036617bc5e0bd7c06f"
  ],
  "_id": "67aab8036617bc5e0bd7c071",
  "createdAt": "2025-02-11T02:37:55.850Z",
  "updatedAt": "2025-02-11T02:37:55.850Z",
  "articleId": 2,
  "__v": 0
} },
      description: "文章新增成功." } */
  articleController.createArticle
);

module.exports = router;
