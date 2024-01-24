import PostFrom from "@/components/forms/PostFrom";
const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start w-full">
          <img src="/assets/icons/add-post.svg" width={36} height={36} alt="" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostFrom action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
