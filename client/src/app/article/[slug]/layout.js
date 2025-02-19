import axios from "axios";

async function getPost(slug) {
  try {
    const response = await axios.get(`http://localhost:5007/articles/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  console.log(slug);
  return {
    title: post?.title || "文章載入中...",
    description: post?.description || "",
  };
}

export default async function SingleArticleWithSlugLayout({ children }) {
  return <>{children}</>;
}
