"use client";
import React from "react";
import ArticleFrom from "@/components/articleForm/ArticleFrom";
import axios from "axios";

const AddPost = () => {
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
      console.log("成功新增" + response.data);
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };
  return (
    <div className="bg-[#f2f2f2] py-10 px-5">
      <ArticleFrom onSubmit={addArticle} />
    </div>
  );
};

export default AddPost;
