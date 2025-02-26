import axios from "axios";

//因為現在沒有使用到client端，現在是使用nextjs
//所以取得API資料是在伺服器端取得，要寫server:5007
const BASE_URL =
  typeof window === "undefined"
    ? "http://server:5007" // SSR（伺服器端）用 Docker 內部名稱
    : "http://localhost:5007"; // Client（瀏覽器）用 localhost

async function getPost(slug) {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${slug}`);
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
