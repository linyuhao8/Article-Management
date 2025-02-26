const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  const mongoUri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_ATLAS_URI
      : process.env.MONGO_DOCKER_URI;

  try {
    await mongoose.connect(mongoUri, {
      user: "admin", // Docker MongoDB 用的帳號
      pass: "secret", // Docker MongoDB 用的密碼
      authSource: "admin", // 認證資料庫，必須加這行
    });
    console.log(`✅ 已連結到 MongoDB: ${mongoUri}`);
  } catch (e) {
    console.error("❌ 連接 MongoDB 失敗:", e);
  }
};

module.exports = connectMongo;
