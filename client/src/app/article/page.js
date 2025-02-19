import PostList from "@/components/PostsList/PostsList";

const Posts = () => {
  return (
    // type, identifier, page, limit
    <>
      <PostList type={"pages"} page={1} title={"所有文章列表"} />
    </>
  );
};

export default Posts;
