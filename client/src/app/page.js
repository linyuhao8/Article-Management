import Image from "next/image";
import PostList from "../components/PostsList/PostsList";

export default function Home() {
  return (
    <>
      <PostList type={"pages"} page={1} title={"首頁"} />
    </>
  );
}
