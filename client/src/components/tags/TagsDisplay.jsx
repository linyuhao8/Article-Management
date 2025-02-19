"use client";
import axios from "axios";
import { useState, useEffect } from "react";

async function getTags(type, limit) {
  try {
    //檢查有沒有limit
    const url = `http://localhost:5007/articles/${type}${
      limit ? `?limit=${limit}` : ""
    }`;

    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`找不到${type}`, error);
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }
    return { error: "無法載入，請稍後再試" };
  }
}

export default function TagsDisplay({ type, limit }) {
  const [tags, setTags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const randomIcons = [
    "💻",
    "🛍️",
    "📱",
    "🎧",
    "📺",
    "🪄",
    "⚽",
    "🏪",
    "❤️",
    "🚚",
    "📖",
    "🏠",
    "👁️",
    "📲",
  ];
  useEffect(() => {
    const fetchDate = async () => {
      const data = await getTags(type, limit);
      if (data.notFound) {
        setError("文章不存在");
        setTags(null);
      } else if (data.error) {
        setError(data.error);
        setTags(null);
      } else {
        setTags(data);
      }
      setIsLoading(false);
    };
    fetchDate();
  }, [type, limit]);

  if (isLoading) {
    return <div className="text-center py-12">載入中...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 text-3xl">{error}</div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {type}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {tags.map((tag) => (
          <div key={tag._id}>
            <a
              href={`/article/${type === "categories" ? "category" : "tag"}/${
                tag.name
              }`}
              className="flex flex-col items-center gap-2 px-0 py-10 bg-white border rounded-full shadow-sm transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-2xl">
                {randomIcons[Math.floor(Math.random() * randomIcons.length)]}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {tag.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
