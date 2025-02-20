const mongoose = require("mongoose");
const { Schema } = mongoose;
const slug = require("mongoose-slug-generator");

// 定義 Article Schema
const ArticleSchema = new Schema(
  {
    articleId: { type: Number, unique: true },
    title: { type: String, required: true },
    //json檔案
    content: { type: Schema.Types.Mixed, required: true },
    //純文字
    contentText: { type: String, required: true },
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
    categories: {
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

  // 根據 title 生成 slusg
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.title
      .trim() // 去除前後空白
      .replace(/\s+/g, "-") // 把所有空白轉換成 "-"
      .replace(/[^\p{L}0-9\-]/gu, "") // 允許所有語言的文字（\p{L}）+ 數字 + "-"
      .replace(/--+/g, "-"); // 避免 "--" 變成連續的 "-"

    console.log("title:", this.title, "slug", this.slug);
  }
  next();
});

ArticleSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const title = update.title;

  if (title && (!update.slug || update.slug.trim() === "")) {
    // 根據 title 生成 slug
    update.slug = title
      .trim() // 去除前後空白
      .replace(/\s+/g, "-") // 把所有空白轉換成 "-"
      .replace(/[^\p{L}0-9\-]/gu, "") // 允許所有語言的文字（\p{L}）+ 數字 + "-"
      .replace(/--+/g, "-"); // 避免 "--" 變成連續的 "-"

    console.log("title:", title, "slug", update.slug);
  }

  next();
});

// 建立模型
const Article = mongoose.model("Article", ArticleSchema);

// 匯出所有模型
module.exports = { Article, Category, Tag, Counter };
