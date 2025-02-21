"use client";
import React, { useState, useEffect } from "react";
import Tiptap from "@/components/editArticleForm/Tiptap";
import CheckEditorContent from "./CheckEditorContent";
import Message from "@/components/editArticleForm/Message";

//此為編輯表單，可用於編輯及新增頁面
// onsubmit是func處理傳送表單，用於修改文章和新增文章
// message傳送訊息，失敗或成功內容
// messageStatus訊息的成功或失敗，可根據狀態顯示顏色
// data是edit文章，載入資料庫的資料，顯示舊資料直接編輯
const ArticleFrom = ({ onSubmit, message, messageStatus, data }) => {
  //Add Page的Form預設值，初始的Json檔案，Tiptap會自動顯示
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
  //Add page的初始的純Text，如果沒有更動Content並直接Submit，會直接送出這個
  const initContentText = `Hi there,
this is a basic example of Tiptap. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists: 
That’s a bullet list with one …
… or two list items.
Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
body {
    display: none;
  }
I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
Wow, that’s amazing. Good work, boy! 👏 
— Mom`;

  //顯示在eidt form上的所有內容
  const [title, setTitle] = useState("*文章標題");
  const [tags, setTags] = useState(["手機"]);
  //Json
  const [content, setContent] = useState(initContentJson);
  //Content的純文字版本，利於搜尋
  const [text, setText] = useState(initContentText);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState(text);
  const [categories, setCategories] = useState("商業");
  const [status, setStatus] = useState("draft");
  const [coverImage, setCoverImage] = useState(null);

  //處理Text多餘的空格或符號等，讓database節省空間並且利於搜尋
  function cleanTextForDatabase(inputText) {
    // 如果 inputText 為 undefined 或 null，則回傳空字串
    if (!inputText) {
      return "";
    }
    return inputText
      .trim() // 去除前後空格
      .replace(/[^\p{L}\d\s\-]/gu, "") // 去除非語言、數字、空白和破折號的字符
      .replace(/\s+/g, " ") // 替換多個空格為一個空格
      .replace(/[\r\n]+/g, " ") // 將所有形式的換行符號（\r 和 \n）替換成空格
      .replace(/(^-|-$)/g, "") // 去除開頭和結尾的破折號
      .replace(/--+/g, "-"); // 去除多重連字符
  }

  // 如果外部傳入data，那就代表是edit page，需要顯示舊的post data
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setTitle(data.title || "*文章標題");
      setTags(
        data.tags.map((tag) => {
          return tag.name;
        }) || ["旅行", "經濟"]
      );
      setContent(data.content || initContentJson);
      setText(data.text || initContentText);
      setSlug(data.slug || "預設網址");
      setDescription(data.description || "這是一篇文章的描述。");
      setCategories(data.categories.name || "分類");
      setStatus(data.status || "draft");
    }
  }, [data]);

  //當Text被編輯，將前30個字放入desciption，自動生成description
  useEffect(() => {
    setDescription(text.length > 30 ? text.slice(0, 80) + "..." : text);
  }, [text]);

  //處理上傳圖片的欄位
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  // 處理表單提交，儲存目前的article data
  // data會傳到parent的onsubmit函數處理，onsubmit會傳送給後端APi
  const handleSubmit = (e) => {
    e.preventDefault();

    //將純文字去除空格跟標點符號等處理，利於搜尋
    const cleanedContentText = cleanTextForDatabase(text);
    const cleanedDescription = cleanTextForDatabase(description);
    // 文章的資料物件
    const articleData = {
      title,
      slug,
      categories,
      status,
      tags,
      description: cleanedDescription,
      contentText: cleanedContentText,
      content,
    };
    // 呼叫父組件傳遞的 onSubmit 函數
    console.log(articleData);
    onSubmit(articleData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="">{data ? "編輯文章" : "新增文章"}</h1>
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
      <Message message={message} messageStatus={messageStatus} />
      <div className="container">
        {/* Title Input */}
        <div className="flex flex-col items-end">
          <span className="border border-gray-300 rounded-xl px-3">
            標題字數：{title.length}
          </span>
          <input
            type="text"
            className="title-input"
            placeholder="*Title..."
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
          initContentJson={content}
          setEditorContent={setContent}
          setText={setText}
        />

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug(如不填寫會自動根據title產生)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            placeholder="url"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            *Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="*文章描述"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700"
          >
            Categories(只能填寫一個)
          </label>
          <input
            type="text"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            placeholder="*分類"
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
            Tags(可填寫多個，用英文字母的逗號分隔 ,)
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
      <CheckEditorContent contentText={text} content={content} />
    </div>
  );
};

export default ArticleFrom;
