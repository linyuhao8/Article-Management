const app = require("./app");
const connectMongo = require("./config/mongoose");

const PORT = process.env.PORT || 5007;

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
  });
});
