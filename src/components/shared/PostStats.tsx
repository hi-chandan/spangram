import { Models } from "appwrite";
import React from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/icons/like.svg"
          width={20}
          height={20}
          alt="like"
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p>0</p>
      </div>
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/icons/save.svg"
          width={20}
          height={20}
          alt="save"
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p>0</p>
      </div>
    </div>
  );
};

export default PostStats;
