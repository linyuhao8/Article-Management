const { Article, Tag, Category, Counter } = require("../models/Article");

// 新增文章方法 /articles/add
exports.create = async (req, res) => {
  try {
    console.log("use create");
    const {
      title,
      content,
      category,
      tags,
      status,
      slug,
      description,
      contentText,
    } = req.body;

    // 必填欄位檢查
    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    //檢查有沒有一樣的slug，在counter增加之前
    if (slug) {
      let findSlug = await Article.findOne({ slug });
      if (findSlug) {
        return res.status(409).send({ message: "Slug already exists" });
      }
    }

    const tagArray = Array.isArray(tags) ? tags : [tags];

    // 查找 Category
    let findCategory = await Category.findOne({ name: category });
    if (!findCategory) {
      findCategory = new Category({ name: category });
      await findCategory.save();
    }

    // 查找 Tags
    const findTags = await Promise.all(
      tagArray.map(async (tagName) => {
        let findTag = await Tag.findOne({ name: tagName });
        if (!findTag) {
          findTag = new Tag({ name: tagName });
          await findTag.save();
        }
        return findTag._id; // 返回 Tag 的 _id
      })
    );

    // 創建文章
    const newArticle = new Article({
      contentText,
      title,
      content,
      category: findCategory._id,
      tags: findTags,
      status,
      slug,
      description,
    });

    await newArticle.save();

    res.status(201).json(newArticle); // 返回新創建的文章
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

// GET /articles/count/:name
exports.countItems = async (req, res) => {
  console.log("use countItems");

  const { name } = req.params; // 獲取 URL 參數
  let count;

  try {
    switch (name) {
      case "articles":
        count = await Article.countDocuments();
        break;
      case "tags":
        count = await Tag.countDocuments();
        break;
      case "categories":
        count = await Category.countDocuments();
        break;
      default:
        return res.status(400).json({ message: "Invalid count type" });
    }

    res.status(200).json({ type: name, count });
  } catch (error) {
    console.error("Error counting items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 取得標籤列表GET /articles/tags?limit=5
exports.getTags = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; // 0 表示回傳所有標籤
    const tags = await Tag.find().limit(limit); // 找出所有標籤並限制數量
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 取得分類列表 GET  /articles/categories?limit=5
exports.getCategories = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; // 0 表示回傳所有分類
    const categories = await Category.find().limit(limit); // 找出所有分類並限制數量
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//查詢單篇文章 /articles/id/:id
exports.findSingleId = async (req, res) => {
  try {
    console.log("use findSingle");
    const id = req.params.id;
    let article = await Article.findOne({ articleId: id })
      .populate("categories") // 只填充 category 的 name
      .populate("tags");
    if (!article) {
      return res.status(404).json({ message: "找不到文章" });
    }
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//查詢單篇文章 /articles/:slug
exports.findSingleSlug = async (req, res) => {
  try {
    console.log("use findSingleSlug");
    const slug = req.params.slug;
    let article = await Article.findOne({ slug: slug })
      .populate("categories") // 只填充 category 的 name
      .populate("tags");
    if (!article) {
      return res.status(404).json({ message: "找不到文章" });
    }
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
//刪除單篇文章 /articles/delete/:id
exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;

    const article = await Article.deleteOne({ articleId: id });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /articles/pages/:page?limit=10
exports.findWithPagination = async (req, res) => {
  console.log("use findWithPagination");

  let page = parseInt(req.params.page, 10);
  if (Number.isNaN(page) || page < 1) {
    page = 1; // 確保 page 至少是 1
  }

  let limit = parseInt(req.query.limit, 10) || 10; // 允許前端指定 limit，默認 10
  if (limit < 1 || limit > 100) {
    limit = 10; // 限制最大 100，防止過多請求
  }

  try {
    const totalArticles = await Article.countDocuments(); // 文章總數
    const totalPages = Math.ceil(totalArticles / limit); // 總頁數

    const articles = await Article.find()
      .populate("categories", "name") // 只填充 category 的 name
      .populate("tags", "name") // 只填充 tags 的 name
      .sort({ createdAt: -1 }) // 按照創建時間排序（最新的在前）
      .skip((page - 1) * limit) // 跳過前面的頁面資料
      .limit(limit); // 限制每頁顯示的數量

    // 如果資料庫沒文章，但使用者請求第 1 頁，返回空陣列而不是 404
    if (articles.length === 0 && page > 1) {
      return res.status(404).json({ message: "此頁沒有文章" });
    }

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalArticles,
      articles,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 刪除所有文章 /articles/deleteAll
exports.deleteAll = async (req, res) => {
  try {
    console.log("use deleteAll");
    const result = await Article.deleteMany({});
    const counter = await Counter.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No articles to delete" });
    }
    res.status(200).json({ message: "All articles deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//搜尋含有tags的article GET /articles/tags/:tag1,:tag2
exports.findByTags = async (req, res) => {
  try {
    console.log("use findByTags");
    // 從查詢參數中取得標籤資訊，例如 ?tags=tag1,tag2 或 ?tags=tag1
    let tagsParam = req.params.tags;
    if (!tagsParam) {
      return res.status(400).json({ message: "Tag is required" });
    }
    let page = parseInt(req.query.page, 10);
    if (Number.isNaN(page) || page < 1) {
      page = 1; // 確保 page 至少是 1
    }
    let limit = parseInt(req.query.limit, 10) || 10; // 允許前端指定 limit，默認 10
    if (limit < 1 || limit > 100) {
      limit = 10; // 限制最大 100，防止過多請求
    }
    // 如果標籤字串中包含逗號，則拆分並移除前後空白，否則直接包裝成陣列
    let tagNames;
    if (tagsParam.indexOf(",") !== -1) {
      tagNames = tagsParam.split(",").map((tag) => tag.trim());
      console.log("tagNames:" + tagNames);
    } else {
      tagNames = [tagsParam.trim()];
    }

    // 在 Tag collection 中查詢符合這些標籤名稱的文件
    const tags = await Tag.find({
      //不區分大小寫
      name: { $in: tagNames.map((tag) => new RegExp(tag, "i")) },
    });

    if (tags.length === 0) {
      return res.status(404).json({ message: "No matching tags found" });
    }

    // 取得所有找到標籤的 _id
    const tagIds = tags.map((tag) => tag._id);
    console.log("tagIds:" + tagIds);

    // 根據找到的 tagIds 查詢文章，使用 $in 表示只要文章的 tags 陣列中包含其中一個 tagId 即符合條件
    const articles = await Article.find({ tags: { $in: tagIds } })
      .populate("tags")
      .limit(limit) //回傳數量限制
      .skip((page - 1) * limit) // 跳過前面的頁面資料
      .sort({ updatedAt: -1 }); //最新的文章在前面;
    //如果沒有找到文章
    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found for these tags" });
    }
    //所有含有標籤的文章有幾個
    const totalArticles = await Article.countDocuments({
      tags: { $in: tagIds },
    });
    //計算總頁數
    const totalPages = Math.ceil(totalArticles / limit);
    res.status(200).json({
      currentPage: page,
      totalArticles: totalArticles,
      totalPages: totalPages,
      articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//搜尋含有categories的articles GET /articles/categories/:categories1,:categories1?page=1?limit=10
exports.findByCategories = async (req, res) => {
  try {
    console.log("use findByCategories");

    // 取得網址中的 category 參數
    const categoriesParams = req.params.categories;
    if (!categoriesParams) {
      return res.status(400).json({ message: "Tag is required" });
    }

    // 處理單個或多個分類名稱
    let categoriesName;
    if (categoriesParams.indexOf(",") !== -1) {
      // 分割逗點，並去除每個 category 旁邊的空格
      categoriesName = categoriesParams
        .split(",")
        .map((category) => category.trim());
    } else {
      categoriesName = [categoriesParams.trim()];
    }

    // 確保 page 至少是 1
    let page = parseInt(req.query.page, 10);
    if (Number.isNaN(page) || page < 1) {
      page = 1;
    }

    // 默認 limit 為 10，並限制最大值為 100
    let limit = parseInt(req.query.limit, 10) || 10;
    if (limit < 1 || limit > 100) {
      limit = 10;
    }

    // 尋找匹配的 categories
    const categories = await Category.find({
      name: {
        $in: categoriesName.map((category) => new RegExp(category, "i")),
      },
    });

    // 如果找不到對應的分類，返回錯誤
    if (categories.length === 0) {
      return res.send("沒有找到這些分類");
    }

    // 取得所有匹配的 category ids
    const categoriesIds = categories.map((category) => category._id);

    // 找到符合條件的文章並分頁
    const findArticle = await Article.find({
      categories: { $in: categoriesIds },
    })
      .populate("categories")
      .limit(limit) // 設定返回數量限制
      .skip((page - 1) * limit) // 跳過前面的頁面資料
      .sort({ updatedAt: -1 }); // 根據更新時間排序

    // 如果找不到任何文章
    if (findArticle.length === 0) {
      return res.status(404).json({ message: "沒有找到包含這些分類的文章" });
    }

    // 計算總文章數和總頁數
    const totalArticles = await Article.countDocuments({
      categories: { $in: categoriesIds },
    });
    const totalPages = Math.ceil(totalArticles / limit);

    // 返回文章資料和分頁信息
    return res.status(200).json({
      currentPage: page,
      totalArticles: totalArticles,
      totalPages: totalPages,
      articles: findArticle,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /articles/:id
exports.updateOne = async (req, res) => {
  try {
    console.log("use updateOne");
    const { id } = req.params; // 取得文章 ID
    const { title, content, category, slug, description, status, contentText } =
      req.body; // 從請求取得要更新的資料

    // 檢查是否有別篇文章用同一個slug
    if (slug) {
      let findSlug = await Article.findOne({ slug });
      console.log(findSlug.articleId);
      if (findSlug.articleId !== id) {
        return res
          .status(409)
          .send({ message: "This slug is used in anothor article" });
      }
    }

    // 查找輸入的Category是否有存在，如果沒有就先創建
    let findCategory = await Category.findOne({ name: category });
    if (!findCategory) {
      findCategory = new Category({ name: category });
      await findCategory.save();
    }
    // 更新資料
    const updatedArticle = await Article.findOneAndUpdate(
      { articleId: id }, // 查詢條件
      {
        $set: {
          ...(contentText && { content }),
          ...(title && { title }), // 更新標題
          ...(content && { "content.example": content }), // 更新 Tiptap JSON 內容
          category: findCategory._id,
          ...(slug && { slug }), // 更新 slug
          ...(description && { description }), // 更新描述
          ...(status && { status }), // 更新狀態
          updatedAt: new Date(), // 更新時間
        },
      },
      { new: true } // 回傳更新後的文章
    )
      .populate("category") // 只填充 category 的 name
      .populate("tags");

    // 檢查文章是否存在
    if (!updatedArticle) {
      return res.status(404).json({ message: "文章不存在" });
    }

    res.status(200).json({ message: "文章更新成功", article: updatedArticle });
  } catch (error) {
    console.error("更新文章錯誤:", error);
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// GET /article/category?=
exports.findCategory = async (req, res) => {};
