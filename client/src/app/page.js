import Image from "next/image";
import PostList from "../components/PostList";

export const metadata = {
  title: "This page has a title 🤔",
  description: "Page description",
};
export default function Home() {
  return (
    <div>
      <div>
        <PostList />
      </div>
    </div>
  );
}
