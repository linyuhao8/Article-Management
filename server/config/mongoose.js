// mongoose.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/post-project");
    console.log("✅ 已連結到 MongoDB");
  } catch (e) {
    console.error("❌ 連接 MongoDB 失敗:", e);
  }
};

module.exports = connectDB;
