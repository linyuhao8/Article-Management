import PostList from "@/components/PostsList/PostsList";
import "../../../css/globals.css";

export default async function ExampleClientComponent({ params }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  console.log(decodedName);
  return (
    <div>
      <PostList
        type="categories"
        identifier={name}
      />
    </div>
  );
}
