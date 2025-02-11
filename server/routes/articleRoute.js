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

//新增文章 POST /article/add
router.post(
  "/add",
  /* #swagger.tags = ['Article'] 
    #swagger.description = '新增文章，使用json格式的資料，傳入資料庫，並儲存在資料庫' */

  /*	#swagger.parameters['obj'] = {
    in: 'body',
    description: '文章資訊.',
    required: true,
    schema: {title: "測試文章",
          content: { 
            type: 'object', 
            example: { 
                type: 'doc', 
                content: [{ 
                    type: 'paragraph', 
                    content: [{ 
                        type: 'text', 
                        text: '這是文章的內容範例。' 
                    }] 
                }] 
            } 
        },
          description: "",
          category: "Tech",
          tags: ["tag1","tag2"],
          status: "draft",
          slug: "test1", }
} */

  articleController.create
);

//查詢文章 GET
router.get(
  "/:id",
  /* #swagger.tags = ['Article'] 
    #swagger.description = '查詢單篇文章，使用 articleId 查詢，第一篇文章為 1，只會有數字' */

  articleController.findSingle
);

module.exports = router;
