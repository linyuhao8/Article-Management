export async function generateMetadata({ params }) {
  const { name } = await params;
  //避免亂碼
  const decodedName = name ? decodeURIComponent(name) : null;

  const pageTitle = decodedName
    ? `${decodedName} | 分類`
    : "分類載入中... | 我的網站";
  const pageDescription = decodedName
    ? `閱讀含有分類「${decodedName}」的文章，了解更多內容。`
    : "正在載入分類，請稍候。";

  return {
    title: pageTitle,
    description: pageDescription,
  };
}

export default function categoryLayout({ children }) {
  return <>{children}</>;
}
