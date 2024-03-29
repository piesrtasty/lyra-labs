import React from "react";
import PostList from "@components/posts";
import { POST_TYPE_SAVED } from "@components/post";
import { SAVED_POSTS } from "@data/queries";
import {
  IMG_MSG_NO_POSTS_SAVED,
  IMG_MSG_NO_MORE_SAVED_POSTS_FOUND,
  IMG_MSG_ERROR_SAVED_POSTS,
} from "@components/shared";

const SavedPosts = () => {
  return (
    <PostList
      query={SAVED_POSTS}
      queryKey={"savedPosts"}
      msgNoPosts={IMG_MSG_NO_POSTS_SAVED}
      msgNoMorePosts={IMG_MSG_NO_MORE_SAVED_POSTS_FOUND}
      msgError={IMG_MSG_ERROR_SAVED_POSTS}
      containerStyle={{ paddingBottom: 50 }}
      postType={POST_TYPE_SAVED}
    />
  );
};

export default SavedPosts;
