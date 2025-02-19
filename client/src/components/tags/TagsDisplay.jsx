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
    console.error(`Error fetching ${type}`, error);
    return null;
  }
}

export default function TagsDisplay({ type, limit }) {
  const [tags, setTags] = useState(null);

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
    getTags(type, limit).then((data) => {
      setTags(data);
    });
  }, [type, limit]);

  if (!tags) {
    return <div className="text-center py-12">Loading...</div>;
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
              href={`/article/${type}/${tag.name}`}
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
