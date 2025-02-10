const request = require("supertest"); // 引入測試工具
const app = require("../server"); // 引入你的 app 模組

describe("Article Routes", () => {
  test("should respond with a 200 status", async () => {
    const response = await request(app).get("/article/test"); // 你可以測試任何已經設置好的路由
    expect(response.status).toBe(200);
  });
});
