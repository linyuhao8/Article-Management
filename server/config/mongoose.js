const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  let mongoUri = process.env.MONGO_LOCAL_URI; // 預設使用本機 MongoDB
  let node = process.env.NODE_ENV;

  if (node == "dockerVolume") {
    mongoUri = process.env.MONGO_DOCKER_URI; // 使用 MongoDB Atlas
  } else if (node == "localMongo") {
    mongoUri = process.env.MONGO_LOCAL_URI; // 使用 Docker MongoDB
  } else if (node == "mongoAtlas") {
    mongoUri = process.env.MONGO_ATLAS_URI;
  } else {
    return "未填寫資料庫連接node模式";
  }

  // 如果連接的是 Docker MongoDB，則需要帳號密碼
  const options =
    mongoUri === process.env.MONGO_DOCKER_URI
      ? {
          user: process.env.MONGO_USER || "admin",
          pass: process.env.MONGO_PASS || "secret",
          authSource: "admin",
        }
      : {};

  try {
    await mongoose.connect(mongoUri, options);
    console.log(`✅ 已連接到 MongoDB: ${mongoUri}`);
  } catch (e) {
    console.error("❌ 連接 MongoDB 失敗:", e);
  }
};

module.exports = connectMongo;
