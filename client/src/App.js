import React from "react";
import PostsCreate from "./PostsCreate";
import PostList from "./PostList";

export default () => {
  return (
    <div className="container">
      <h1>Blog</h1>
      <PostsCreate />
      <hr />
      <PostList />
      <hr />
    </div>
  );
};
