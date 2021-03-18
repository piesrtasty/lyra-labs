import React from "react";
import PostList from "@components/posts";
import { NEW_ARCHIVED_POSTS } from "@data/queries";
import {
  IMG_MSG_NO_POSTS_ARCHIVED,
  IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND,
  IMG_MSG_ERROR_ARCHIVED_POSTS,
} from "@components/shared";

const ArchivedPosts = () => {
  return (
    <PostList
      query={NEW_ARCHIVED_POSTS}
      queryKey={"newArchivedPosts"}
      msgNoPosts={IMG_MSG_NO_POSTS_ARCHIVED}
      msgNoMorePosts={IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND}
      msgError={IMG_MSG_ERROR_ARCHIVED_POSTS}
      containerStyle={{ paddingBottom: 50 }}
    />
  );
};

export default ArchivedPosts;
