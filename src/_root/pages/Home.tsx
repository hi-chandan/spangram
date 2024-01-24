import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import RightSide from "@/components/shared/RightSide";
const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container ">
        <div className="home-posts ">
          {isPostLoading && !posts ? (
            "Loding..."
          ) : (
            <ul className=" space-y-4">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="max-md:hidden">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
