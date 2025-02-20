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
    "contentText":"證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多",
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
          categories: "Tech",
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
    schema: {title: "測試文章",
    "contentText":"證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多",
          content: {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "textStyle",
              "attrs": {
                "color": "rgb(68, 68, 68)"
              }
            }
          ],
          "text": "新創公司 Humane 起初在推出 Ai Pin 時氣勢如虹，一度稱這款產品將取代 iPhone 在世人心中的地位；但這款產品在正式出貨後卻惡評不斷，且一度「每日退貨量超過每日銷貨量」，去年就不斷傳出 Humane 有意將整體業務以 10 億美元賣給 HP。稍早 Humane 就表示，將大部分的業務出售給 HP，且將停售 AI Pin。但原本希望以 10 億美元賣得風光體面的 Humane，最終卻被 HP 以 1.16 億美元買下。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "據 Humane 在支援文件中的說明，已售出的 AI Pin 將可正常運作至美東時間 2 月 28 日下午 3 點。之後，AI Pin 將無法再連接 Humane 伺服器，導致其功能將不再包含通話、訊息、AI 查詢與回應，或雲端存取。此外，Humane 也建議用戶在服務關閉前下載 AI Pin 上儲存的所有照片、影片和筆記，否則這些資料將被永久刪除。"
        }
      ]
    },
    {
      "type": "image",
      "attrs": {
        "src": "https://img.technews.tw/wp-content/uploads/2024/01/24153338/Humane-ai-pin-800x492.jpg",
        "alt": null,
        "title": null
      }
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Humane 表示，關閉後仍可使用的功能僅限於離線操作，如電池電量顯示，但所有需要雲端連接的功能，包括語音互動、AI 回應與 .Center 存取，都將無法使用。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "據 Humane 公布的 FAQ，僅在原始出貨日起 90 天內的 AI Pin 訂單 才符合退款資格，且退款申請必須在 2025 年 2 月 27 日前提交。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "如果用戶已支付 2025 年 2 月 28 日之後的 Humane 訂閱費，Humane 表示將按比例退還款項。此外，針對因充電盒召回而等待更換的顧客，公司將於 2025 年 2 月 28 日後自動退還充電盒部分的購買款項。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Humane 的新聞稿顯示，HP 這次收購包括 Humane 的 CosmOS 作業系統，並將聘請 Humane 的技術團隊，同時獲得超過 300 項專利與專利申請。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "在 AI Pin 的正式發表前，Humane 曾透過 TED 舞台展示這款裝置，並發布了一段宣傳影片，但最終影片還需要修正以糾正錯誤。然而，AI Pin 在 2024 年 4 月正式上市後遭到嚴厲批評。《The Verge》記者 David Pierce 直言「它根本無法正常運作」，而科技評測 YouTuber MKBHD 更將其評為「我評測過最糟糕的產品」。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "在 AI Pin 失敗後，Humane 仍為 CosmOS 作業系統添加了一些新功能，並嘗試將其重新定位為其他公司可搭載在裝置中的作業系統。"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "據《彭博社》報導，Humane 團隊，包括創辦人 Imran Chaudhri 和 Bethany Bongiorno，將加入 HP 並成立一個新部門，負責將 AI 技術整合至 個人電腦、印表機與智慧會議室 產品線。該部門將被命名為 HP IQ，並成為 HP 的 AI 創新實驗室，目標是為 HP 產品與服務建立智慧生態系，以推動未來的工作模式發展。"
        }
      ]
    }
  ]
},
          description: "",
          categories: "Tech",
          tags: ["tag1","tag2"],
          status: "draft",
          slug: "test1", }
} */

  articleController.updateOne
);

module.exports = router;
