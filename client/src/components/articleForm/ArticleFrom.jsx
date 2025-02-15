"use client";
import React, { useState, useEffect } from "react";
import Tiptap from "@/components/articleForm/Tiptap";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(["dsds", "ADSD"]);
  const [editorContent, setEditorContent] = useState([]);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("這是一篇文章的描述。");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    console.log("editorContent");
  }, [editorContent]);
  const [coverImage, setCoverImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="">新增文章</h1>
        <div className="flex nowrap gap-2 items-center">
          <p className="text-sky-600">{status}</p>
          <button className="px-3 py-1 bg-[#005FCC] text-white rounded-md">
            Save
          </button>
        </div>
      </div>
      <div className="container">
        {/* Title Input */}
        <input
          type="text"
          className="title-input"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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
          editorContent={editorContent}
          setEditorContent={setEditorContent}
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
        <button className="submit-button">Publish</button>
      </div>
    </div>
  );
};

export default AddPost;
