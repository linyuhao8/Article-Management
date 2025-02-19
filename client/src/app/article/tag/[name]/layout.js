export async function generateMetadata({ params }) {
    const { name } = await params;
    //避免亂碼
    const decodedName = name ? decodeURIComponent(name) : null;
  
    const pageTitle = decodedName
      ? `${decodedName} | 標籤`
      : "標籤載入中... | 我的網站";
    const pageDescription = decodedName
      ? `閱讀含有標籤「${decodedName}」的文章，了解更多內容。`
      : "正在載入標籤，請稍候。";
  
    return {
      title: pageTitle,
      description: pageDescription,
    };
  }
  
  export default function TagsLayout({ children }) {
    return <>{children}</>;
  }
  