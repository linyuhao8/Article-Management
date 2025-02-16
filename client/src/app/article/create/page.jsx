"use client";
import React, { useState } from "react";
import ArticleFrom from "@/components/articleForm/ArticleFrom";
import axios from "axios";

const AddPost = () => {
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(null);
  // 當送出會直接 post 到 http://localhost:5007/articles/add
  const addArticle = async (articleData) => {
    try {
      const response = await axios.post(
        "http://localhost:5007/articles/add",
        articleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessageStatus(true);
      setMessage("文章新增成功");
      console.log("成功新增:", response.data);
    } catch (error) {
      setMessageStatus(false);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setMessage(errorMessage);
      console.error("Error adding article:", error);
    }
  };
  return (
    <div className="bg-[#f2f2f2] py-10 px-5">
      <ArticleFrom
        onSubmit={addArticle}
        message={message}
        messageStatus={messageStatus}
      />
    </div>
  );
};

export default AddPost;
