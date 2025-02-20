export async function generateMetadata({ params }) {
  const { id } = await params;

  return {
    title: `正在編輯ID:${id}的文章`,
    description: "編輯內容頁面",
  };
}

export default function editLayout({ children }) {
  return <>{children}</>;
}
