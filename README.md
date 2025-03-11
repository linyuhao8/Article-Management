# 📖 **Article Management System**

這是一個 **全端文章管理系統**，前端使用 `Next.js` `Tiptap`，後端使用 `Express.js`，數據庫採用 `MongoDB`。

支援 **文章的新增、刪除、修改**，並提供 **Swagger API 文件** 供開發者參考。

## 圖片
![homepage](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/homepage.png)
![singleArticle](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/singleArticle.png)
![editArticle](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/editArticle.png)
![editArticle2](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/editArticle2.png)
![Api-Docs](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/backend%20api-doce.png)
![FindByCategory](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/FindByCategory.png)
![categories](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/categories.png)
![tags](https://github.com/linyuhao8/Article-Management/blob/c13c0997e2a225624c9aff7056abcd87c649bfb4/client/public/tags.png)


## **技術**

- **前端:** Next.js, React, TailwindCSS,Tiptap
- **後端:** Node.js, Express.js, Mongoose (MongoDB ODM)
- **數據庫:** MongoDB (本地或 MongoDB Atlas)
- **測試:** Jest (未來可擴展)
- **API 文檔:** Swagger (在 `/api-docs` 路徑)
- **Docker 容器化:** 簡單指令即可啟動完整系統和資料庫。

### Tiptap 編輯器
Tiptap 是一款基於 ProseMirror 的強大富文本編輯器，提供靈活的擴展能力，可用於構建 Markdown 編輯器、部落格系統、內容管理系統 (CMS) 等。
本專案使用 Tiptap 作為文章編輯器，並可擴充自訂功能，且能自由切換HTML和JSON和TEXT，我們將JSON格式和TEXT存進資料庫，JSON在下次開啟文章會顯示格式，TEXT可以利於搜尋。

#### 主要功能
🔹 文字格式化
- 粗體 (Bold)
- 斜體 (Italic)
- 刪除線 (Strike-through)
- 程式碼 (Code)

📝 段落與標題
- 段落 (Paragraph)
- 標題 (Heading 1-6)
- 分隔線

🔢 清單
- 無序清單 (Bullet List)
- 有序清單 (Ordered List)

🖼️ 多媒體與區塊
- 圖片 (Image)：可插入並調整大小
- 連結：可插入和移除
- 區塊引用 (Blockquote)
- 水平線 (Horizontal Rule)

🎨 自訂顏色
- 支援新增自訂顏色按鈕，例如紫色字體，可以自訂


## 🚀 本地開發環境啟動
### 注意
windows用戶一定要照做，避免錯誤
- windows電腦操作一樣，但我的終端機命令都只適合mac或linux，如果您是windows用戶請使用windows的終端機語法。
- windows的用戶.env檔案要將vscode右下角的CRLF改成LF
- windows的用戶.env檔案要將vscode右下角的UTF-8通過編碼保存。

  
### **1 安裝依賴**
`位置：Article-Management/server`

```bash
#進入 server 目錄，安裝後端依賴
cd server
npm install
```
`位置：Article-Management/client`
```bash
#進入 client 目錄，安裝前端依賴
cd client
npm install
```

### **2 設定環境變數.env檔案**
先新增.env檔案到server資料夾下。 
`位置：Article-Management/server/.env`
```bash
touch .env
```
格式請參考.env.sample。
填寫選擇要使用的NODE_ENV，然後寫入URI資料
>注意：使用本地端啟動專案， dockerVolume不能用，因為沒有透過docker啟動專案，所以只能用local或atlas。
`位置：Article-Management/server/.env`

```.env.sample
#server/.env
PORT=5007

#載入後可以到 後端網址 http://localhost:5007 查看是否載入環境變數
ENV_TEST=已載入環境變數

# .env 有三種連線方式
#dockerVolume or localMongo or mongoAtlas
NODE_ENV=mongoAtlas

# Docker volume
MONGO_DOCKER_URI=mongodb://admin:secret@db:27017/post_db?authSource=admin

# 本地的電腦
MONGO_LOCAL_URI=mongodb://127.0.0.1:27017/postProject

# 遠端mongodb
MONGO_ATLAS_URI=mongodb+srv://<hello>:<password>@project1.d1ulg.mongodb.net/postManagement?retryWrites=true&w=majority
```

.env將會被Docker compose使用，並在整個專案運作，一定要添加才能讓專案正常運作。


### **3 啟動後端**
`位置：Article-Management/server`

```bash
npm start
```

伺服器將運行在 `http://localhost:5007`，除非您在.env裡面更改PORT。

### **4 啟動前端**
`位置：Article-Management/client`

```bash
npm run dev
```

前端將運行在 `http://localhost:3000`。

### **5 創建一篇文章**
您現在可以新增文章，新增後可以使用編輯文章功能，但是現在還沒有新增跳轉成edit文章功能。
## 🐳 **使用 Docker 啟動 (推薦)**

### 注意
windows用戶一定要照做
- windows電腦操作一樣，但我的終端機命令都只適合mac或linux，如果您是windows用戶請使用windows的終端機語法。
- windows的用戶.env檔案要將vscode右下角的CRLF改成LF
- windows的用戶.env檔案要將vscode右下角的UTF-8通過編碼保存，否則Docker-compose讀取不到。
如果你不想手動安裝 MongoDB，可以使用 Docker 一鍵啟動整個系統。

### **1 新增.env檔案**
先新增.env檔案到主資料夾下(與server和client資料夾同層級)
`位置：Article-Management/.env`
```bash
#Article-Management/.env
touch .env
```
格式請參考.env.sample。
- windows的用戶.env檔案要將vscode右下角的CRLF改成LF
![tags](https://github.com/linyuhao8/Article-Management/blob/main/client/public/windows-LF.png)
- windows的用戶.env檔案要將vscode右下角的UTF-8通過編碼保存，否則Docker-compose讀取不到環境變數，將會無法啟動。
![tags](https://github.com/linyuhao8/Article-Management/blob/main/client/public/windows-utf-8.png)
![tags](https://github.com/linyuhao8/Article-Management/blob/main/client/public/windows--utf-8.png)
`位置：Article-Management/.env`
```env
#Article-Management/.env
PORT=5007

#載入後可以到 後端網址 http://server:5007 查看是否載入環境變數
ENV_TEST=已載入環境變數

# .env 有三種連線方式
#dockerVolume or localMongo or mongoAtlas
NODE_ENV=dockerVolume

# Docker volume
MONGO_DOCKER_URI=mongodb://admin:secret@db:27017/post_db?authSource=admin

# 本地的電腦
# 如果使用docker，那就要連接本地端的資料庫位置
MONGO_LOCAL_URI=mongodb://host.docker.internal:27017/postProject

# 遠端mongodb
MONGO_ATLAS_URI=mongodb+srv://<hello>:<password>@project1.d1ulg.mongodb.net/postManagement?retryWrites=true&w=majority
```

.env將會被Docker compose使用，並在整個專案運作，一定要添加才能讓專案正常運作。
#### 更換API網址

需要更換NextJs要求API的網址，Next.js 預設是伺服器端渲染 (SSR)，當程式在 伺服器端執行 時，window 物件 不存在，此時應該使用 Docker 內部的服務名稱 server:5007 來請求 API，而不是localhost:5007(預設)。
`位置：Article-Management/client/.env`
```
#Article-Management/client/.env
#如果使用Docker啟動才需要使用
NEXT_PUBLIC_API_BASE_URL=http://server:5007
```

### **2 設定docker compose**

.env裡面NODE_ENV有三種連接資料庫的模式，#dockerVolume or localMongo or mongoAtlas。

#### 使用dockerVolume
如果要使用dockerVolume就使用以下檔案。
`位置：Article-Management/.env`
```.env
#Article-Management/.env
#.env 有三種連線方式
#dockerVolume or localMongo or mongoAtlas
NODE_ENV=dockerVolume

# Docker volume
MONGO_DOCKER_URI=mongodb://admin:secret@db:27017/post_db?authSource=admin
```

`位置：Article-Management/docker-compose.yml`
```docker-compose.yml
#Article-Management/docker-compose.yml
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - db
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "5007:5007"
    depends_on:
      - db
    environment:
      - NODE_ENV=${NODE_ENV}
      - PORT=${PORT}
      - MONGO_DOCKER_URI=${MONGO_DOCKER_URI}
      - MONGO_ATLAS_URI=${MONGO_ATLAS_URI}
      - MONGO_LOCAL_URI=${MONGO_LOCAL_URI}
      - ENV_TEST=${ENV_TEST}
  db:
    volumes:
      - post_db:/data/db
    image: mongo:latest
    restart: always
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secret
volumes:
  post_db:
```
#### 使用Local mongoldb

`位置：Article-Management/.env`
```
#Article-Management/.env
#.env 有三種連線方式
#dockerVolume or localMongo or mongoAtlas
NODE_ENV=localMongo

# 本地的電腦
#如果使用docker，那就要連接本地端的資料庫位置
MONGO_LOCAL_URI=mongodb://host.docker.internal:27017/postProject
```
`位置：Article-Management/docker-compose.yml`
```
#Article-Management/docker-compose.yml
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "5007:5007"
    environment:
      - NODE_ENV=${NODE_ENV}
      - PORT=${PORT}
      - MONGO_DOCKER_URI=${MONGO_DOCKER_URI}
      - MONGO_ATLAS_URI=${MONGO_ATLAS_URI}
      - MONGO_LOCAL_URI=${MONGO_LOCAL_URI}
      - ENV_TEST=${ENV_TEST}
```

#### 使用Mongoldb Atlas
`位置：Article-Management/.env`
```
#Article-Management/.env
#.env 有三種連線方式
#dockerVolume or localMongo or mongoAtlas
NODE_ENV=mongoAtlas

# 遠端Mongodb Atlas
MONGO_ATLAS_URI=mongodb+srv://<hello>:<password>@project1.d1ulg.mongodb.net/postManagement?retryWrites=true&w=majority
```
`位置：Article-Management/docker-compose.yml`
```
#Article-Management/docker-compose.yml
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "5007:5007"
    environment:
      - NODE_ENV=${NODE_ENV}
      - PORT=${PORT}
      - MONGO_DOCKER_URI=${MONGO_DOCKER_URI}
      - MONGO_ATLAS_URI=${MONGO_ATLAS_URI}
      - MONGO_LOCAL_URI=${MONGO_LOCAL_URI}
      - ENV_TEST=${ENV_TEST}
```

### **3 構建並啟動容器**
`位置：Article-Management`

-p 為Docker容器名稱

-d 為背景運行

```bash
#bash
docker-compose --env-file .env -p  article-management up -d
```

這將會：

- 啟動 **MongoDB (儲存在 Docker Volume)**
- 啟動 **後端 Express API (port: 5007)**
- 啟動 **前端 Next.js (port: 3000)**

您也可以自行在Docker compose或Dockerfile設定相關參數

### **4 查看docker運行image**
`位置：Article-Management`
```bash
docker ps
```

### 5 編輯檔案後重新建立image
`位置：Article-Management`
```bash
#bash
docker-compose --env-file .env up -d --build
```
### 7 使用mongosh
`位置：Article-Management`
```bash
#bash
# 查看運行的image 
docker ps 
# 進入image 
docker exec -it <container_id_or_name> 
# 使用mongosh 
mongosh -u admin -p secret --authenticationDatabase admin 
# 顯示所有資料庫 
show dbs 
# 選擇資料庫 
use db 
show collections 
db.collections.find() 
# 離開 
exit
``` 

### 8.檢查log
`位置：Article-Management`
```
docker-compose logs server
```
### **9 停止與移除容器**
`位置：Article-Management`

```bash
#停止
docker-compose down
```

## 📌 **API 端點 (部分)**



> 完整 API 文件請在啟動專案後，至參考 Swagger (http://localhost:5007/api-docs)。
> 

---

## 🎯 **未來改進**

✅ 新增 **推薦文章**

✅ 新增 **Redis 快取**

✅ 新增 **搜尋系統**

✅ 新增 **會員權限系統**

✅ 增加 **JWT 驗證**

✅ 支援 **圖片上傳 (Cloudinary)**

✅ 整合 **GraphQL API**

---

## 🎉 **貢獻 & 聯絡**

如果你有任何問題或建議，請開 Issue 或 Fork 貢獻 💖

🔗 [**CoolDas網站**](https://cool-das.com/)

🔗 [**GitHub**](https://github.com/linyuhao8)

🚀 **Happy Coding!**
