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
  await mongoose.connect(mongoUri);
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
        description: "",
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
      expect(res.body).toHaveProperty("description");

      // 查詢資料庫來確保資料已經被創建
      const createdArticle = await Article.findOne({ title: "測試文章" });
      expect(createdArticle).not.toBeNull(); // 確保文章被正確儲存
      expect(createdArticle.title).toBe("測試文章");
      expect(createdArticle.category).not.toBeNull();
      expect(createdArticle.tags).toHaveLength(2); // 假設你傳遞了 1 個標籤
      console.log(createdArticle);
    });
    it("沒有填寫必填，回傳400", async () => {
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
    it("如果填寫的unique欄位已存在，應該回傳 409 錯誤", async () => {
      const res = await request(app)
        .post("/article/add")
        .send({
          title: "新文章",
          content: "內容",
          category: "測試",
          tags: ["測試"],
          slug: "sdsd",
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toBe("Duplicate key error");
      expect(res.body.message).toMatch(/slug/i);
    });
  });

  describe("GET /article/:id", () => {
    let mockArticle;

    // 在每次測試之前創建一個模擬的文章
    beforeEach(() => {
      mockArticle = {
        title: "測試文章",
        content: "文章內容",
        slug: "test-article",
        category: "Tech",
        status: "draft",
        tags: ["tag1", "tag2"],
      };
    });

    // 測試成功情況
    it("使用articleId查詢單篇文章", async () => {
      // 模擬 mongoose 查找資料
      jest.spyOn(Article, "findOne").mockResolvedValue(mockArticle);

      const response = await request(app).get("/article/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockArticle);
    });

    // 測試找不到文章情況
    it("如果文章未找到，應該返回 404 錯誤", async () => {
      jest.spyOn(Article, "findOne").mockResolvedValue(null);

      const response = await request(app).get("/article/1");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Article not found");
    });

    // 測試錯誤處理情況
    it("如果發生錯誤，應該返回 500 錯誤", async () => {
      jest
        .spyOn(Article, "findOne")
        .mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/article/1");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Server error");
    });
  });
  // 可以添加更多的路由測試，例如 GET, PUT, DELETE 等
});
