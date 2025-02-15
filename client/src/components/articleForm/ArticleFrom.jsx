"use client";
import React, { useState, useEffect } from "react";
import Tiptap from "@/components/articleForm/Tiptap";
import CheckEditorContent from "./CheckEditorContent";

const AddPost = () => {
  const initContentJson = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Hi there,",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "this is a ",
          },
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "basic",
          },
          {
            type: "text",
            text: " example of ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://Tiptap.com",
                  target: "_blank",
                  rel: "noopener noreferrer nofollow",
                  class: null,
                },
              },
              {
                type: "bold",
              },
            ],
            text: "Tiptap",
          },
          {
            type: "text",
            text: ". Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            attrs: {
              color: "",
            },
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "That’s a bullet list with one …",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            attrs: {
              color: "",
            },
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "… or two list items.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "image",
        attrs: {
          src: "https://placehold.co/800x400",
          alt: null,
          title: null,
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: {
          language: "css",
        },
        content: [
          {
            type: "text",
            text: "body {\n    display: none;\n  }",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Wow, that’s amazing. Good work, boy! 👏 ",
              },
              {
                type: "hardBreak",
              },
              {
                type: "text",
                text: "— Mom ",
              },
            ],
          },
        ],
      },
    ],
  };
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(["dsds", "ADSD"]);
  const [content, setContent] = useState(initContentJson);
  const [contentText, setContentText] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("這是一篇文章的描述。");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    console.log("正在編輯");
  }, [content]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();

    // 建立文章物件
    const articleData = {
      contentText,
      title,
      content,
      slug,
      description,
      category,
      status,
      tags,
    };

    // 呼叫父組件傳遞的 onSubmit 函數
    // onSubmit(articleData);
    console.log(articleData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="">新增文章</h1>
        <div className="flex nowrap gap-2 items-center">
          <p className="text-sky-600">{status}</p>
          <button
            className="px-3 py-1 bg-[#005FCC] text-white rounded-md"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <div className="container">
        {/* Title Input */}
        <div className="flex flex-col items-end">
          <span className="border border-gray-300 rounded-xl px-3">
            標題字數：{title.length}
          </span>
          <input
            type="text"
            className="title-input"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Cover Image */}
        <div className="cover-container">
          {coverImage ? (
            <img src={coverImage} alt="Cover" className="cover-image" />
          ) : (
            <label className="upload-label">
              <span>Upload Cover Image</span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Content Editor (Simplified) */}

        <Tiptap
          initContentJson={initContentJson}
          setEditorContent={setContent}
          setContentText={setContentText}
        />

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags.join(",")} // 將陣列轉換為逗號分隔的字串
            onChange={(e) => setTags(e.target.value.split(","))} // 將字串轉換為陣列
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter tags separated by commas"
          />
        </div>
        {/* Submit Button */}
        <button className="submit-button" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddPost;
