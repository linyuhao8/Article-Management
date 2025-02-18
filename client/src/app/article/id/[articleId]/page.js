import PostDisplay from "@/components/singleArticle/PostDisplay";

const SingleArticleWithId = async ({ params }) => {
  //等取得slug在傳送到postDisplay
  const { articleId } = await params;
  console.log(articleId);
  const identifier = articleId;
  return (
    <div>
      <PostDisplay type={"id"} identifier={identifier} />
    </div>
  );
};

export default SingleArticleWithId;
