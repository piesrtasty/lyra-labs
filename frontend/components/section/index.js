import React from "react";
import PostList from "../post-list";

const Section = ({ date, posts }) => {
  return <PostList date={date} posts={posts} />;
};

export default Section;
