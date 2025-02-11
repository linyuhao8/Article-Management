const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

// 定義 Article Schema
const ArticleSchema = new mongoose.Schema(
  {
    articleId: { type: Number, unique: true }, // 會自行填寫，第一篇為ID:1
    title: { type: String, required: true },
    content: { type: Object, required: true }, // Tiptap JSON 內容
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

const initCounter = async () => {
  const counterExists = await Counter.findById("articleId");
  if (!counterExists) {
    const counter = await Counter.create({ _id: "articleId", seq: 0 });
    console.log("Counter Initialized:", counter);
  }
};
initCounter();

// 自動遞增 `articleId` 和處理 `category` 和 `tags`
ArticleSchema.pre("save", async function (next) {
  // 自動遞增 articleId
  if (!this.articleId) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "articleId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.articleId = counter.seq;
  }
  //如果沒有slug就根據title，有就保留用戶輸入
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// 建立模型
const Article = mongoose.model("Article", ArticleSchema);

// 匯出所有模型
module.exports = { Article, Category, Tag };
