import { DessertIcon } from "lucide-react";

export default function Hero({ title, tagTitle, identifier, description }) {
  return (
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
        {title ? title : tagTitle}
      </h2>
      <p className="mt-2 text-lg/8 text-gray-600">
        {description
          ? description
          : "你的文章管理系統是一個基於 Next.js 和 Express 的全端專案，前端使用 React 並搭配 Tiptap 作為富文本編輯器，後端則透過 Express 連接 MongoDB 來存儲文章資料。系統的核心功能包括文章的讀取、編輯與顯示，透過 API 獲取文章內容並在前端動態渲染。"}
      </p>
    </div>
  );
}
