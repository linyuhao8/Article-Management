"use client";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect } from "react";

import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaTrashAlt,
  FaHeading,
  FaListUl,
  FaListOl,
  FaCodeBranch,
  FaQuoteRight,
  FaMinus,
  FaUndo,
  FaRedo,
  FaHighlighter,
  FaLink,
  FaUnlink,
  FaChevronDown,
  FaImage,
} from "react-icons/fa";

//edit page的編輯工具欄
const MenuBar = ({ editor, setEditorContent }) => {
  //處理連結
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  //處理圖片
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  //如果tiptap editor沒有載入就不會顯示
  if (!editor) {
    return null;
  }

  return (
    //工具列UI
    <div className="control-group editor-toolbar">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <FaHighlighter />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <FaTrashAlt />
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear Nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <span className="heading-btn">
            <FaHeading />1
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <span className="heading-btn">
            <FaHeading />2
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <span className="heading-btn">
            <FaHeading />3
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          <span className="heading-btn">
            <FaHeading />4
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          <span className="heading-btn">
            <FaHeading />5
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          <span className="heading-btn">
            <FaHeading />6
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <FaCode />
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <FaLink />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <FaUnlink />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FaQuoteRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FaMinus />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <FaChevronDown />
        </button>
        <button onClick={addImage}>
          <FaImage />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          <div className="w-5 h-5 bg-[#958DF1] rounded"></div>
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#F87171").run()}
          className={
            editor.isActive("textStyle", { color: "#F87171" })
              ? "is-active"
              : ""
          }
        >
          <div className="w-5 h-5 bg-red-400 rounded"></div>
        </button>
        <button
          onClick={() => {
            // 使用 getJSON 方法來提取編輯器的內容並轉換為 JSON 格式
            const jsonContent = editor.getJSON();
            setEditorContent(jsonContent);
          }}
        >
          Get JSON
        </button>
      </div>
    </div>
  );
};

// initContentJson，初始的顯示的內容，由parent決定內容（edit or add）
// setEditorContent，tiptap更新的值會儲存到parent的Content中（一個空格也會更新），提交表單的時候會傳送到資料庫
// setText，設定文字內容（有變化就更新），用於傳給資料庫的純文字
const Tiptap = ({ initContentJson, setEditorContent, setText }) => {
  //tiptap擴充功能
  const extensions1 = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`);

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false;
          }

          // disallowed protocols
          const disallowedProtocols = ["ftp", "file", "mailto"];
          const protocol = parsedUrl.protocol.replace(":", "");

          if (disallowedProtocols.includes(protocol)) {
            return false;
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map((p) =>
            typeof p === "string" ? p : p.scheme
          );

          if (!allowedProtocols.includes(protocol)) {
            return false;
          }

          // disallowed domains
          const disallowedDomains = [
            "example-phishing.com",
            "malicious-site.net",
          ];
          const domain = parsedUrl.hostname;

          if (disallowedDomains.includes(domain)) {
            return false;
          }

          // all checks have passed
          return true;
        } catch {
          return false;
        }
      },
      shouldAutoLink: (url) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`https://${url}`);

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = [
            "example-no-autolink.com",
            "another-no-autolink.com",
          ];
          const domain = parsedUrl.hostname;

          return !disallowedDomains.includes(domain);
        } catch {
          return false;
        }
      },
    }),
    Image,
  ];

  const editor = useEditor({
    //tiptap擴充功能
    extensions: extensions1,

    //初始顯示的content
    content: initContentJson,

    //只在瀏覽器載入，編輯器的不要
    immediatelyRender: false,

    //內容變化就傳到 parent 組件
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      setEditorContent(jsonContent); // 更新父層狀態
      const textContent = editor.getText();
      setText(textContent);
    },
  });

  //edit page會要求資料庫的舊content，然後更新這邊，就可以編輯舊內容啦
  useEffect(() => {
    if (editor && initContentJson) {
      editor.commands.setContent(initContentJson); // 設定新的內容
    }
  }, [initContentJson]);

  return (
    <div className="Editor ">
      {/* 工具欄 */}
      <MenuBar editor={editor} setEditorContent={setEditorContent} />
      {/* 編輯的區域 */}
      <EditorContent editor={editor} className="editForm" />
    </div>
  );
};

export default Tiptap;
