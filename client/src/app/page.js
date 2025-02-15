import Image from "next/image";
import PostList from "../components/PostList";
import Tiptap from "@/components/articleForm/Tiptap";

export default function Home() {
  return (
    <div>
      <div>
        <PostList />
      </div>
    </div>
  );
}
