"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import Pagination from "./Pagination";

//get 文章資料
async function getPosts(type, identifier, page, limit) {
  try {
    let response;
    // 兩種API請求方式
    // 全部文章顯示，根據頁數，預設10頁，可加上限制，1-100
    // 可輸入page 和 limit
    if (type === "pages") {
      let url = `http://localhost:5007/articles/pages/${page}`;
      response = await axios.get(url, {
        params: { limit }, // 使用 params 傳遞 limit 參數
      });
      console.log(url);
      //
      //根據標籤或分類顯示文章
      //可輸入 type,identifier,page,limit
      //type分為category或tag
    } else {
      let url = `http://localhost:5007/articles/${type}/${identifier}/`;
      response = await axios.get(url, {
        params: { page, limit }, // 使用 params 傳遞 limit 參數
      });
      console.log(url);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`找不到含有${encodeURIComponent(identifier)}的文章`, error);
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }
    return { error: "無法載入，請稍後再試" };
  }
}

// 可接受參數 type, identifier, page, limit，由parent傳入
// type：category,tag
// identifier：名稱例如旅行，經濟
// page：nubmer，default:1
// limit：number，default:10，1-100
export default function PostsList({
  type,
  identifier,
  page,
  limit,
  title,
  description,
}) {
  //Api回傳後的文章內容
  const [posts, setPosts] = useState([]);
  //APi回傳目前的頁數
  const [currentPage, setCurrentPage] = useState(page);
  //總共的文章數
  const [totalArticles, setTotalArtices] = useState(null);
  //總共頁數預設為10篇一頁
  const [totalPages, setTotalPages] = useState(null);
  //標籤標題
  const [tagTitle, setTagTitle] = useState(null);
  //載入
  const [isLoading, setIsLoading] = useState(true);
  //錯誤
  const [error, setError] = useState(null);

  //要求資料
  //currentPage 初始為 parent得page頁數
  //當pagination點擊，currentPage會被更新，觸發useEffect，然後根據currrentPage fetchData
  const fetchData = async (currentPage) => {
    const data = await getPosts(type, identifier, currentPage, limit);
    //找不到文章
    if (data.notFound) {
      setError(
        `找不到含有 「${decodeURIComponent(identifier)}」 ${
          type === "categories" ? "category" : "tag"
        }的文章`
      );
      setPosts(null);
    } else if (data.error) {
      setError(data.error);
      setPosts(null);
    } else {
      //設定前端顯示資料
      setPosts(data.articles);
      setTotalArtices(data.totalArticles);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    //根據目前頁面去請求API
    fetchData(currentPage);

    //tag article page的標題
    setTagTitle(decodeURIComponent(identifier));
  }, [type, identifier, currentPage, limit]);

  //監聽文章資料，等到API前端取得資料將會console.log
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (isLoading) {
    return <div className="text-center py-12">載入中...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 text-3xl">{error}</div>
    );
  }
  return (
    <>
      <div className="bg-white pt-24 pb-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Hero
            //首頁和article page用title
            //tag和category用tagTitle
            //有title就用title，如果沒有就是tagTitle
            title={title}
            tagTitle={tagTitle}
            identifier={identifier}
            //說明
            description={description}
          />
          {!posts ? (
            <div className="flex flex-col items-center mt-10">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading images...</p>
            </div>
          ) : (
            <>
              <div className="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 sm:grid-cols-2">
                {posts.map((post) => (
                  <article
                    key={post.articleId} // 確保 key 唯一
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time className="text-gray-500">
                        {/* 如果要日期就用toLocaleDateString() */}
                        {/* 如果要時間就用toLocaleTimeString() */}
                        {new Date(post.updatedAt).toLocaleString("zh-TW", {
                          timeZone: "Asia/Taipei",
                          hour12: false,
                        })}
                      </time>
                      <a
                        href={`/article/category/${post.categories?.name}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.categories?.name}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <a href={`/article/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        alt="author"
                        src={
                          post.author?.imageUrl ||
                          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        } // 預設圖片
                        className="size-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">
                          <a href="#">
                            <span className="absolute inset-0" />
                            {post.author?.name || "Unknown"}{" "}
                            {/* 顯示作者名稱 */}
                          </a>
                        </p>
                        <p className="text-gray-600">
                          {post.author?.role || "No Role"}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-10">
                <Pagination
                  onPageChange={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
