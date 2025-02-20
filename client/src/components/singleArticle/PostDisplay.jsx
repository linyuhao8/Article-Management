"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "@/components/singleArticle/PostContent";
import { FaFolderOpen, FaTags } from "react-icons/fa";
import Image from "next/image";

/**
 * 根據 `articleId` 或 `slug` 來取得文章資料
 * @param {string} type - 用於判斷是透過 `id` 還是 `slug` 查詢文章
 * @param {string} identifier - 文章的唯一識別碼（`id` 或 `slug`）
 * @returns {Promise<Object>} 文章的 JSON 資料，或錯誤資訊
 */
async function getPost(type, identifier) {
  try {
    // 根據 `type` 決定要使用的 API 路徑
    const url =
      type === "slug"
        ? `http://localhost:5007/articles/${identifier}` // 透過 slug 查詢
        : `http://localhost:5007/articles/id/${identifier}`; // 透過 id 查詢

    // 發送 GET 請求取得文章資料
    let response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);

    // 處理文章不存在的情況
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }

    // 其他錯誤
    return { error: "無法載入文章，請稍後再試" };
  }
}

/**
 * 單篇文章顯示組件
 * @param {Object} props
 * @param {string} props.type - 文章查詢類型（`id` 或 `slug`）
 * @param {string} props.identifier - 文章的識別碼
 * @returns {JSX.Element} 單篇文章的完整內容
 */
export default function SingleArticle({ type, identifier }) {
  // 儲存文章資訊的狀態
  const [post, setPost] = useState(null);
  // 控制載入狀態
  const [isLoading, setIsLoading] = useState(true);
  // 錯誤訊息狀態
  const [error, setError] = useState(null);

  /**
   * 當 `type` 或 `identifier` 變化時，重新取得文章資料
   */
  useEffect(() => {
    const fetchData = async () => {
      //要求資料
      const data = await getPost(type, identifier);
      //找不到文章
      if (data.notFound) {
        setError("文章不存在");
        setPost(null);
        //錯誤
      } else if (data.error) {
        setError(data.error);
        setPost(null);
        //儲存資料
      } else {
        setPost(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [type, identifier]);

  // 顯示載入中狀態
  if (isLoading) {
    return <div className="text-center py-12">載入中...</div>;
  }

  // 若發生錯誤，顯示錯誤訊息
  if (error) {
    return (
      <div className="text-center py-12 text-red-500 text-3xl">{error}</div>
    );
  }

  // 文章內容區塊
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          {/* 文章標題與分類 */}
          <header className="flex flex-col gap-2 mb-10 not-format">
            <h1 className="mb-4 text-5xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>

            {/* 文章分類與標籤 */}
            <div className="flex gap-3 mb-2">
              <span>
                <a
                  href={`/article/category/${post.categories.name}`}
                  className="flex flex-nowrap border rounded-md px-3 py-1 items-center gap-1"
                >
                  <FaFolderOpen />
                  {post.categories.name}
                </a>
              </span>
              {post.tags.map((tag) => (
                <span key={tag._id}>
                  <a
                    href={`/article/tag/${tag.name}`}
                    className="flex flex-nowrap border rounded-md px-3 py-1 items-center gap-1"
                  >
                    <FaTags />
                    {tag.name}
                  </a>
                </span>
              ))}
            </div>

            {/* 作者資訊 */}
            <address className="flex items-center not-italic">
              <div className="inline-flex items-center gap-3 mr-3 text-sm text-gray-900 dark:text-white">
                <Image
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="size-12 rounded-full bg-gray-50"
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Jese Leos
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Graphic Designer, educator & CEO Flowbite
                  </p>
                </div>
              </div>
            </address>

            {/* 分隔線 */}
            <hr className="border-gray-300 mt-3" />

            {/* 文章時間與編輯按鈕 */}
            <div className="flex justify-between items-center">
              <p className="text-base text-gray-500 dark:text-gray-400">
                <time>
                  {new Date(post.updatedAt).toLocaleString("zh-TW", {
                    timeZone: "Asia/Taipei",
                    hour12: false,
                  })}
                </time>
              </p>
              <span className="border rounded-md px-3 py-1 border-gray-300">
                <a href={`/article/edit/${post.articleId}`}>編輯文章</a>
              </span>
            </div>
          </header>

          {/* 文章內容 */}
          <div>
            <PostContent content={post.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
