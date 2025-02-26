const app = require("./app");
const connectMongo = require("./config/mongoose");

require("dotenv").config();
const PORT = process.env.PORT;
connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
  });
});
