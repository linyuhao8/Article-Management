const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

//新增文章POST /articles/add
router.post(
  "/add",
  // #swagger.summary = 'add article'
  /* #swagger.tags = ['Article management'] 
    #swagger.description = '新增文章，使用json格式的資料，傳入資料庫，並儲存在資料庫' */

  /*	#swagger.parameters['obj'] = {
    in: 'body',
    description: '文章資訊.',
    required: true,
    schema: {
    title: "測試文章",
    contentText:"證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多",
    description: "",
    categories: "Tech",
    tags: ["tag1","tag2"],
    status: "draft",
    slug: "test1", 
    content: {
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "text": "Hi there,你好啊"
        }
      ]
    }
  ]
}
          }
} */

  articleController.create
);

//刪除單篇文章DELETE /articles/delete/:id
router.delete(
  "/delete/:id",
  // #swagger.summary = 'delete single article'
  /* #swagger.tags = ['Article management'] 
    #swagger.description = '刪除的單篇文章，使用articleID' */
  articleController.deleteOne
);

//計算文章數量GET /articles/count/:name
router.get(
  "/count/:name",
  // #swagger.summary = 'count articles tags categories'
  /* #swagger.tags = ['Count items'] 
    #swagger.description = '取得數量可填入articles、tags、categories' */
  articleController.countItems // 使用 countArticles 方法來計算數量
);

//刪除全部文章DELETE /articles/deleteAll
router.delete(
  "/deleteAll",
  // #swagger.summary = 'delete all article'
  /* #swagger.tags = ['Article management'] 
    #swagger.description = '刪除所有文章跟articleId' */
  articleController.deleteAll
);

//取得所有category /articles/categories?limit=5
router.get(
  "/categories",
  // #swagger.summary = 'get all categories'
  /* #swagger.tags = ['Article categories'] 
    #swagger.description = '取得所有category，可以加上數量限制' */
  articleController.getCategories
);

//取得所有tags /articles/tags?limit=5
router.get(
  "/tags",
  // #swagger.summary = '回傳所有tags'
  /* #swagger.tags = ['Article tags'] 
      #swagger.description = '取得所有tags，可以加上數量限制' */
  articleController.getTags
);

//搜尋含有tags的article GET /articles/tags/:tag1,:tag2/:page?limit=5
router.get(
  "/tag/:tag/",
  // #swagger.summary = '回傳含有tags的articles'
  /* #swagger.tags = ['Article tags'] 
    #swagger.description = '搜尋含有tags的文章，可要求多個tags，可選擇page和limit，預設為10篇文章，/articles/tags/:tag1,:tag2/:page?limit=5' */
  articleController.findByTags
);

//搜尋含有categories的articles GET /articles/categories/:categories1,:categories1/:page?limit=5
router.get(
  "/category/:category/",
  // #swagger.summary = '回傳含有tags的articles'
  /* #swagger.tags = ['Article categories'] 
      #swagger.description = '搜尋含有tags的文章，可要求多個tags，可選擇page和limit，預設為10篇文章，搜尋含有tags的article /articles/categories/:categories1,:categories1/:page?limit=5' */
  articleController.findByCategories
);

//取得文章，頁數和數量限制GET /articles/pages/:page?limit=10
router.get(
  "/pages/:page",
  // #swagger.summary = 'article list'
  /* #swagger.tags = ['Article display'] 
      #swagger.description = '取得文章列表，會從最新開始，page為2，limit為5，代表會回傳2*5篇文章，並以最新往後排序 // http://localhost:5006/article?page=2' */
  articleController.findWithPagination
);

//顯示單篇文章GET /article/id/:id
router.get(
  "/id/:id",
  // #swagger.summary = 'find single article with articleId'
  /* #swagger.tags = ['Article display'] 
        #swagger.description = '查詢單篇文章，使用 articleId 查詢，第一篇文章為 1，只會有數字' */
  articleController.findSingleId
);

//顯示單篇文章GET /articles/:slug
router.get(
  "/:slug",
  // #swagger.summary = 'find single article with slug'
  /* #swagger.tags = ['Article display'] 
        #swagger.description = '查詢單篇文章，使用 slug 查詢' */
  articleController.findSingleSlug
);

//修改文章資料PUT /articles/edit/:id
router.put(
  "/edit/:id",
  // #swagger.summary = 'edit article data'
  /* #swagger.tags = ['Article management'] 
    #swagger.description = '修改文章' */

  /*	#swagger.parameters['obj'] = {
    in: 'body',
    description: '文章資訊.',
    required: true,
    schema: {
    title: "測試文章",
    contentText:"證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多",
    description: "",
    categories: "Tech",
    tags: ["tag1","tag2"],
    status: "draft",
    slug: "test1", 
    content: {
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "text": "Hi there,你好啊"
        }
      ]
    }
  ]
}
          }
} */

  articleController.updateOne
);

module.exports = router;
