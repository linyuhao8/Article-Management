export async function generateMetadata({ params }) {
  const { articleId } = await params;

  return {
    title: `您已經刪除ID:${articleId}文章載入中...`,
  };
}

export default async function SingleArticleWithIdLayout({ children }) {
  return <>{children}</>;
}
