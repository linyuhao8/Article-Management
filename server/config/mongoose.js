const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  const mongoUri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_ATLAS_URI
      : process.env.MONGO_LOCAL_URI;

  try {
    await mongoose.connect(mongoUri);
    console.log(`✅ 已連結到 MongoDB: ${mongoUri}`);
  } catch (e) {
    console.error("❌ 連接 MongoDB 失敗:", e);
  }
};

module.exports = connectMongo;
