"use client";
import React, { use, useEffect, useState } from "react";
import ArticleFrom from "@/components/editArticleForm/ArticleFrom";
import axios from "axios";

async function getPost(identifier) {
  try {
    // 根據 identifier 決定是 id 還是 slug
    const url = `http://localhost:5007/articles/id/${identifier}`;
    let response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    if (error.response && error.response.status === 404) {
      return { notFound: true }; // 文章不存在
    }
    return { error: "無法載入文章，請稍後再試" }; // 其他錯誤
  }
}

export default function EditPage({ params }) {
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(null);
  const [data, setData] = useState(null);
  // 當送出會直接 put 到 http://localhost:5007/articles/edit/:id

  const editArticle = async (articleData) => {
    try {
      const { id } = await params;
      console.log(articleData);
      const response = await axios.put(
        `http://localhost:5007/articles/edit/${id}`,
        articleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessageStatus(true);
      setMessage("文章更改成功");
      console.log("成功更改:", response.data);
    } catch (error) {
      setMessageStatus(false);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setMessage(errorMessage);
      console.error("Error edit article:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { id } = await params;
      let data = await getPost(id);
      console.log(data);
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#f2f2f2] py-10 px-5">
      <ArticleFrom
        onSubmit={editArticle}
        message={message}
        messageStatus={messageStatus}
        data={data}
        type={"edit"}
      />
    </div>
  );
}
