import axios from "axios";

async function getPost(articleId) {
  try {
    const response = await axios.get(
      `http://localhost:5007/articles/id/${articleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { articleId } = await params;
  const post = await getPost(articleId);

  return {
    title: post?.title || "文章載入中...",
    description: post?.description || "",
  };
}

export default async function ArticlesLayout({ children }) {
  return <>{children}</>;
}
