const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const { Article, Tag, Category } = require("../models/Article");

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
  //測試新增文章功能
  describe("POST /articles/add", () => {
    afterAll(async () => {
      await Article.deleteMany({});
    });

    it("新增文章測試", async () => {
      const newPost = {
        title: "測試文章",
        slug: "url1",
        categories: "商業",
        status: "draft",
        tags: ["手機", "平板"],
        description: "Hi there你好啊",
        contentText: "Hi there你好啊",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Hi there,你好啊",
                },
              ],
            },
          ],
        },
      };

      const res = await request(app)
        .post("/articles/add")
        .send(newPost)
        .expect(201);

      expect(res.body).toHaveProperty("title", "測試文章");
      expect(res.body).toHaveProperty("content");
      expect(res.body).toHaveProperty("categories");
      expect(res.body).toHaveProperty("tags");
      expect(res.body).toHaveProperty("articleId");
      expect(res.body).toHaveProperty("slug");
      expect(res.body).toHaveProperty("description");

      // 查詢資料庫來確保資料已經被創建
      const createdArticle = await Article.findOne({ title: "測試文章" });
      expect(createdArticle).not.toBeNull(); // 確保文章被正確儲存
      expect(createdArticle.title).toBe("測試文章");
      expect(createdArticle.categories).not.toBeNull();
      expect(createdArticle.tags).toHaveLength(2); // 假設你傳遞了 1 個標籤
      console.log(createdArticle);
    });

    it("沒有填寫title，回傳400", async () => {
      const newPost = {
        title: "",
        slug: "url1",
        categories: "商業",
        status: "draft",
        tags: ["手機", "平板"],
        description: "Hi there你好啊",
        contentText: "Hi there你好啊",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Hi there,你好啊",
                },
              ],
            },
          ],
        },
      };

      const res = await request(app).post("/articles/add").send(newPost);

      expect(res.status).toBe(400);
    });

    it("如果沒有傳送contentText，回傳400，通常會自動生成contentText", async () => {
      const newPost = {
        title: "測試文章",
        slug: "url1",
        categories: "商業",
        status: "draft",
        tags: ["手機", "平板"],
        description: "Hi there你好啊",
        contentText: "",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Hi there,你好啊",
                },
              ],
            },
          ],
        },
      };

      const res = await request(app).post("/articles/add").send(newPost);

      expect(res.status).toBe(400);
    });

    it("沒有填寫slug，根據title自動生成，並創建成功201", async () => {
      const newPost = {
        title: "測試文章",
        slug: "",
        categories: "商業",
        status: "draft",
        tags: ["手機", "平板"],
        description: "Hi there你好啊",
        contentText: "Hi there你好啊",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Hi there,你好啊",
                },
              ],
            },
          ],
        },
      };

      const res = await request(app).post("/articles/add").send(newPost);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("slug", "測試文章");
    });

    it("slug欄位有重複，回傳409error", async () => {
      const res = await request(app)
        .post("/articles/add")
        .send({
          title: "測試文章",
          slug: "url1",
          categories: "商業",
          status: "draft",
          tags: ["手機", "平板"],
          description: "Hi there你好啊",
          contentText: "Hi there你好啊",
          content: {
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: {
                  level: 2,
                },
                content: [
                  {
                    type: "text",
                    text: "Hi there,你好啊",
                  },
                ],
              },
            ],
          },
        });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Slug already exists");
    });

    it("content需為Json", async () => {
      const res = await request(app)
        .post("/articles/add")
        .send({
          title: "測試文章",
          slug: "url1",
          categories: "商業",
          status: "draft",
          tags: ["手機", "平板"],
          description: "Hi there你好啊",
          contentText: "Hi there你好啊",
          content: "你好啊",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /articles/id/:id", () => {
    afterAll(async () => {
      await Article.deleteMany({});
    });
    let mockArticle;

    // 在每次測試之前創建一個模擬的文章
    beforeEach(async () => {
      mockArticle = {
        title: "測試文章",
        contentText:
          "證券分析師張陳浩表示，資服股在去年曾出現一波漲勢，主要是由美國的資安大廠股價創高所帶動，加上AI的發展趨勢上，相關的資安問題更加重要，DeepSeek所帶來的想像題材將比先前的AI發展所帶動的資安商機更多",
        description: "1234",
        categories: "Tech",
        tags: ["tag1", "tag2"],
        status: "draft",
        slug: "test1",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Hi there,你好啊",
                },
              ],
            },
          ],
        },
      };
    });
    it("使用 articleId 查詢單篇文章", async () => {
      // 先建立文章
      const res = await request(app)
        .post("/articles/add")
        .send(mockArticle)
        .expect(201);

      // 取得剛剛新增的文章
      const createdArticle = await Article.findOne({ slug: "test1" });

      // 確保文章已經建立
      expect(createdArticle).not.toBeNull();

      // 用 `articleId` 查詢
      const response = await request(app).get(
        `/articles/id/${createdArticle.articleId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: mockArticle.title,
        contentText: mockArticle.contentText,
        description: mockArticle.description,
        status: mockArticle.status,
        slug: mockArticle.slug,
      });
      expect(response.body).toHaveProperty("categories");
      expect(response.body).toHaveProperty("tags");
      await Article.deleteOne({ articleId: createdArticle.articleId });
    });

    // 測試找不到文章情況
    it("如果文章未找到，應該返回 404 錯誤", async () => {
      const response = await request(app).get("/articles/id/1");
      expect(response.status).toBe(404);
    });
  });
  // 可以添加更多的路由測試，例如 GET, PUT, DELETE 等
});
