const { Article, Tag, Category } = require("../models/Article");

//測試路由
exports.test = async (req, res) => {
  res.status(200).send("可以進入");
};

// 新增文章方法
exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags, status, slug } = req.body;

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
