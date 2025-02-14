const mongoose = require("mongoose");
const { Schema } = mongoose;
const slug = require("mongoose-slug-generator");

// 定義 Article Schema
const ArticleSchema = new Schema(
  {
    articleId: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slug_padding_size: 6,
    }, // 自動從 title 產生 slug
    description: {
      type: String,
      default: "這是一篇文章的描述。",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

// 定義 Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});
const Category = mongoose.model("Category", CategorySchema);

// 定義 Tag Schema
const TagSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});
const Tag = mongoose.model("Tag", TagSchema);

// 定義 Counter Schema (自動遞增 ID)
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 },
});
const Counter = mongoose.model("Counter", CounterSchema);

ArticleSchema.pre("save", async function (next) {
  if (!this.articleId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: "articleId" },
        { $inc: { seq: 1 } }, // 每次遞增 1
        {
          new: true,
          upsert: true, // 自動創建不存在的文檔
          projection: { seq: 1 }, // 僅返回 seq 字段
        }
      );

      this.articleId = counter.seq;
      console.log(
        "儲存pre save 步驟 已經有數字了，Generated articleId is:",
        this.articleId
      );
    } catch (err) {
      console.error("Error generating articleId:", err);
      return next(err);
    }
  }
  // 根據 title 生成 slug
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") // 去除前後的破折號
      .replace(/--+/g, "-"); // 去除多重連字符
  }
  next();
});

// 建立模型
const Article = mongoose.model("Article", ArticleSchema);

// 匯出所有模型
module.exports = { Article, Category, Tag, Counter };
