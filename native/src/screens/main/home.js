import React from "react";
import PostList from "@components/posts";
import { FEED_POSTS } from "@data/queries";
import {
  IMG_MSG_NO_POSTS_FOUND,
  IMG_MSG_NO_MORE_POSTS_FOUND,
  IMG_MSG_ERROR_POSTS,
} from "@components/shared";

const HomeScreen = () => {
  return (
    <PostList
      query={FEED_POSTS}
      queryKey={"feedPosts"}
      msgNoPosts={IMG_MSG_NO_POSTS_FOUND}
      msgNoMorePosts={IMG_MSG_NO_MORE_POSTS_FOUND}
      msgError={IMG_MSG_ERROR_POSTS}
    />
  );
};

export default HomeScreen;
