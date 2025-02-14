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
    schema: {title: "測試文章",
          content: {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "農曆年台股休市期間，中國大陸人工智慧（AI）新創公司DeepSeek發表高性價比的AI模型，一亮相就撼動全球傳統AI股，1月27日重創全球AI晶片股，輝達（Nvidia）股價崩跌16.9%，不過，蘋果在台股封關期間則是逆勢上揚；分析師坦言，"
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "受惠DeepSeek的想像題材，包括IC設計、IP、資服股、手機供應鏈相關的PCB、功率放大器、軸承股等都值得留意。"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "DeepSeek橫空出世、強勢衝擊台股　資服股卻領導大盤連4漲"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "台股龍年以23,525.41點封關，受到DeepSeek橫空出世震撼科技業股價的衝擊，蛇年開紅盤日台股出現重挫，但之後後連4漲，7日收在23,478.27點，周線僅下跌47.14點，資服股成為盤面上的亮點族群，另外，IC設計、IP股也是吸金的族群。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "台股除了蛇年開紅盤日大跌之外，大盤指數逐日反彈上漲，7日開低走高，各類股表現上以資訊服務類股最為吸金，漲幅領先各類股，櫃買市場的資服股也是大漲表現，包括零壹、訊連、凌群、華經、資通、訊達電腦、驊宏資、凱衛、叡揚等，合計有9家上市櫃資服股衝上漲停收盤。"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "AI發展帶動資服股上漲，IC設計及IP股也吸引資金搶進"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多。"
        }
      ]
    }
  ]
},
          description: "",
          category: "Tech",
          tags: ["tag1","tag2"],
          status: "draft",
          slug: "test1", }
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

//搜尋含有tags的article GET /articles/tags/:tag1,:tag2
router.get(
  "/tags/:tags",
  // #swagger.summary = '回傳含有tags的articles'
  /* #swagger.tags = ['Article tags'] 
    #swagger.description = '搜尋含有tags的article' */
  articleController.findByTags
);

//搜尋含有categories的articles GET /articles/categories/:categories1,:categories1
router.get(
  "/categories/:categories",
  // #swagger.summary = '回傳含有tags的articles'
  /* #swagger.tags = ['Article categories'] 
      #swagger.description = '搜尋含有tags的article' */
  articleController.findByCategories
);

//取得文章，頁數和數量限制GET /articles/pages/:page?limit=10
router.get(
  "/pages/:page",
  // #swagger.summary = 'article list'
  /* #swagger.tags = ['Article display'] 
      #swagger.description = '取得文章列表 // http://localhost:5006/article?page=2' */
  articleController.findWithPagination
);

//顯示單篇文章GET /article/id/:id
router.get(
  "/id/:id",
  // #swagger.summary = 'find single article'
  /* #swagger.tags = ['Article display'] 
        #swagger.description = '查詢單篇文章，使用 articleId 查詢，第一篇文章為 1，只會有數字' */
  articleController.findSingle
);

//修改文章資料PUT /article/edit/:id
router.put(
  "/edit/:id",
  // #swagger.summary = 'edit article data'
  /* #swagger.tags = ['Article management'] 
    #swagger.description = '修改文章' */
  /*	#swagger.parameters['obj'] = {
    in: 'body',
    description: '修改文章.',
    required: true,
    schema: {title: "已修改文章",
          content: {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "農曆年台股休市期間，中國大陸人工智慧（AI）新創公司DeepSeek發表高性價比的AI模型，一亮相就撼動全球傳統AI股，1月27日重創全球AI晶片股，輝達（Nvidia）股價崩跌16.9%，不過，蘋果在台股封關期間則是逆勢上揚；分析師坦言，"
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "受惠DeepSeek的想像題材，包括IC設計、IP、資服股、手機供應鏈相關的PCB、功率放大器、軸承股等都值得留意。"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "DeepSeek橫空出世、強勢衝擊台股　資服股卻領導大盤連4漲"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "台股龍年以23,525.41點封關，受到DeepSeek橫空出世震撼科技業股價的衝擊，蛇年開紅盤日台股出現重挫，但之後後連4漲，7日收在23,478.27點，周線僅下跌47.14點，資服股成為盤面上的亮點族群，另外，IC設計、IP股也是吸金的族群。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "台股除了蛇年開紅盤日大跌之外，大盤指數逐日反彈上漲，7日開低走高，各類股表現上以資訊服務類股最為吸金，漲幅領先各類股，櫃買市場的資服股也是大漲表現，包括零壹、訊連、凌群、華經、資通、訊達電腦、驊宏資、凱衛、叡揚等，合計有9家上市櫃資服股衝上漲停收盤。"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "AI發展帶動資服股上漲，IC設計及IP股也吸引資金搶進"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多。"
        }
      ]
    }
  ]
},
          description: "修改過了",
          category: "Life",
          status: "draft",
          slug: "change1", }
} */
  articleController.updateOne
);

module.exports = router;
