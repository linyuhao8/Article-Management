import PostList from "@/components/PostsList/PostsList";
import "../../../css/globals.css";

export default async function ExampleClientComponent({ params }) {
  const { name } = await params;
  const decodedName = name ? decodeURIComponent(name) : null;
  return (
    <div>
      {/* type, identifier, page, limit */}
      <PostList
        type={"tag"}
        identifier={name}
        description={`有包含 ${decodedName} 的文章`}
      />
    </div>
  );
}
