const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const { Article } = require("../models/Article");

let mongoServer;
// 在測試前設置 MongoDB 內存伺服器
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // 連接到內存中的 MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected to in-memory server");
});

// 在測試結束後關閉 MongoDB 連接
afterAll(async () => {
  await mongoose.connection.dropDatabase(); // 清空資料庫
  await mongoose.connection.close(); // 關閉連接
  await mongoServer.stop(); // 停止 MongoDB 伺服器
});

describe("Article Routes", () => {
  //測試路由
  test("test router /article/test", async () => {
    const res = await request(app).get("/article/test");
    expect(res.statusCode).toBe(200);
  });
  //測試新增文章功能
  describe("POST /article/add", () => {
    it("新增文章測試", async () => {
      const newPost = {
        //articleId不用填自行生成
        slug: "sdsd",
        title: "測試文章",
        content: { type: "doc", content: [] },
        category: "測試類別",
        tags: ["測試標籤", "測試2"],
        status: "draft",
      };

      const res = await request(app)
        .post("/article/add")
        .send(newPost)
        .expect(201);

      expect(res.body).toHaveProperty("title", "測試文章");
      expect(res.body).toHaveProperty("content");
      expect(res.body).toHaveProperty("category");
      expect(res.body).toHaveProperty("tags");
      expect(res.body).toHaveProperty("articleId");
      expect(res.body).toHaveProperty("slug");

      // 查詢資料庫來確保資料已經被創建
      const createdArticle = await Article.findOne({ title: "測試文章" });
      expect(createdArticle).not.toBeNull(); // 確保文章被正確儲存
      expect(createdArticle.title).toBe("測試文章");
      expect(createdArticle.category).not.toBeNull();
      expect(createdArticle.tags).toHaveLength(2); // 假設你傳遞了 1 個標籤
      console.log(createdArticle);
    });
    it("測試沒有填寫", async () => {
      const newPost = {
        //articleId不用填自行生成
        slug: "",
        title: "",
        content: { type: "doc", content: [] },
        category: "",
        tags: ["", ""],
        status: "draft",
      };

      const res = await request(app).post("/article/add").send(newPost);

      expect(res.status).toBe(400);
    });
  });

  // 可以添加更多的路由測試，例如 GET, PUT, DELETE 等
});
