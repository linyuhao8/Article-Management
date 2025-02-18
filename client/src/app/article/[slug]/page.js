
import PostDisplay from "@/components/singleArticle/PostDisplay";

const SingleArticleWithSlug = async ({ params }) => {
  //等取得slug在傳送到postDisplay
  const { slug } = await params;
  const identifier = slug;
  return (
    <div>
      <PostDisplay type={"slug"} identifier={identifier} />
    </div>
  );
};

export default SingleArticleWithSlug;
