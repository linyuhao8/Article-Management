"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "@/components/singleArticle/PostContent";
import { FaFolderOpen, FaTags } from "react-icons/fa";
import Image from "next/image";

// 用於根據 articleId 或 slug 來取得文章資料的函數
function getPost(type, identifier) {
  // 根據 identifier 決定是 id 還是 slug
  const url =
    type === "slug"
      ? `http://localhost:5007/articles/${identifier}`
      : `http://localhost:5007/articles/id/${identifier}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching post:", error);
      return null;
    });
}

export default function SingleArticle({ type, identifier }) {
  const [post, setPost] = useState(null);

  //當取得type和identifier才要求後端的文章api資料
  useEffect(() => {
    // 處理元件掛載時的資料擷取，不能用async
    getPost(type, identifier).then((data) => {
      setPost(data);
    });
  }, [type, identifier]);

  if (!post) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="flex flex-col gap-2 mb-10 not-format">
            <h1 className="mb-4 text-5xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>

            <div className="flex gap-3 mb-2">
              <span>
                <a
                  href={`/article/category/${post.category.name}`}
                  className="flex flex-nowrap border rounded-md px-3 py-1 items-center gap-1"
                >
                  <FaFolderOpen />
                  {post.category.name}
                </a>
              </span>
              {post.tags.map((tag) => (
                <span key={tag._id}>
                  <a
                    href={`/article/tags/${tag.name}`}
                    className="flex flex-nowrap border rounded-md px-3 py-1 items-center gap-1"
                  >
                    <FaTags />
                    {tag.name}
                  </a>
                </span>
              ))}
            </div>
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
            <hr className="border-gray-300 mt-3" />
            <p className="text-base text-gray-500 dark:text-gray-400">
              <time>
                {new Date(post.updatedAt).toLocaleString("zh-TW", {
                  timeZone: "Asia/Taipei",
                  hour12: false,
                })}
              </time>
            </p>
          </header>
          <div>
            <PostContent content={post.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
