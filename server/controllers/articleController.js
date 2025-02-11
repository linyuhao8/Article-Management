const { Article, Tag, Category } = require("../models/Article");

//測試路由
exports.test = async (req, res) => {
  res.status(200).send("可以進入");
};

// 新增文章方法
exports.create = async (req, res) => {
  try {
    const { title, content, category, tags, status, slug, description } =
      req.body;

    // 檢查必填欄位
    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ error: "Title, content, and category are required" });
    }

    const tagArray = Array.isArray(tags) ? tags : [tags];

    // 查找 category
    let findCategory = await Category.findOne({ name: category });
    if (!findCategory) {
      // 如果找不到 category，則創建一個新的
      findCategory = new Category({ name: category });
      await findCategory.save();
    }

    // 查找或創建 Tags
    const findTags = await Promise.all(
      tagArray.map(async (tagName) => {
        let findTag = await Tag.findOne({ name: tagName });
        if (!findTag) {
          findTag = new Tag({ name: tagName });
          await findTag.save();
        }
        return findTag._id; // 返回 _id
      })
    );

    // 創建文章
    const newArticle = new Article({
      title,
      content,
      category: findCategory._id,
      tags: findTags,
      status,
      slug,
      description,
    });
    await newArticle.save();

    res.status(201).json(newArticle); // 返回新創建的文章資料
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB Duplicate Key 錯誤
      res.status(409).json({
        error: "Duplicate key error",
        message: `Article with ${JSON.stringify(err.keyValue)} already exists.`,
      });
    } else {
      // 捕捉錯誤並返回詳細訊息
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
  }
};

//查詢單篇文章
exports.findSingle = async (req, res) => {
  try {
    const articleId = Number(req.params.id);
    const article = await Article.findOne({ articleId: articleId });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    console.error(err); // 使用 console.error 輸出錯誤
    res.status(500).json({ message: "Server error" }); // 返回 500 錯誤消息
  }
};

//刪除單篇文章
//查詢多篇文章
// GET /articles：查詢所有文章。
// GET /articles/:id：查詢單篇文章。
// POST /articles：創建新文章。
// PATCH /articles/:id：更新單篇文章。
// DELETE /articles/:id：刪除單篇文章。
// GET /articles/count：查詢文章總數。
// GET /articles/tags：查詢指定標籤的文章。
// PATCH /articles/bulk-update：批量更新文章。
// GET /articles/stats：文章統計資訊。
// PATCH /articles/:id/status：更新文章狀態。
