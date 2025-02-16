"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Example() {
  const [posts, setPosts] = useState("");
  //get 文章資料
  async function getPosts() {
    try {
      const response = await axios.get(
        "http://localhost:5007/articles/pages/1"
      );
      console.log(response.data.articles);
      setPosts(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From the Article
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        <div
          className={
            posts.length == 0
              ? ""
              : "mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          }
        >
          {!posts ? (
            <div className="flex flex-col items-center mt-10">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading images...</p>
            </div> // Loading state
          ) : (
            posts.map((post) => (
              <article
                key={post.articleId} // Ensure this ID is unique for each post
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time className="text-gray-500">{post.updatedAt}</time>
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category?.name} {/* Ensure category exists */}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href="#">
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
                    } // Use post.author?.imageUrl or fallback image
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.author?.name || "Unknown"}{" "}
                        {/* Display author name */}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      {post.author?.role || "No Role"}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
