import React from "react";
import PostCard from "./postCard";

export default function Feed() {
  return (
    <div className="px-4 py-4 grid grid-flow-row space-y-4">
      <PostCard />
      <PostCard />
    </div>
  );
}
