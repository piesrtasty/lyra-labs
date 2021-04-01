import React from "react";
import PostList from "@components/posts";
import { POST_TYPE_ARCHIVED } from "@components/post";
import { ARCHIVED_POSTS } from "@data/queries";
import {
  IMG_MSG_NO_POSTS_ARCHIVED,
  IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND,
  IMG_MSG_ERROR_ARCHIVED_POSTS,
} from "@components/shared";

const ArchivedPosts = () => {
  return (
    <PostList
      query={ARCHIVED_POSTS}
      queryKey={"archivedPosts"}
      msgNoPosts={IMG_MSG_NO_POSTS_ARCHIVED}
      msgNoMorePosts={IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND}
      msgError={IMG_MSG_ERROR_ARCHIVED_POSTS}
      containerStyle={{ paddingBottom: 50 }}
      postType={POST_TYPE_ARCHIVED}
    />
  );
};

export default ArchivedPosts;
