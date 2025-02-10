const mongoose = require("mongoose");

const connectMongo = async (
  mongoUri = "mongodb://127.0.0.1:27017/postProject"
) => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`✅ 已連結到 MongoDB: ${mongoUri}`);
  } catch (e) {
    console.error("❌ 連接 MongoDB 失敗:", e);
  }
};

module.exports = connectMongo;
