import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { SAVED_POSTS, ARCHIVED_POSTS } from "@data/queries";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";
import EmptyPlaceholder from "./empty-placeholder";
import Heading from "./heading";

import { POST_TYPE_DEFAULT } from "../post-card";

const PostList = ({
  archived = false,
  title = "LOREM IPSUM",
  postType = POST_TYPE_DEFAULT,
}) => {
  const query = archived ? ARCHIVED_POSTS : SAVED_POSTS;
  const dataKey = archived ? "archivedPosts" : "savedPosts";
  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: { take: 5 },
  });
  return (
    <>
      <Heading title={title} />
      {loading && (
        <>
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
        </>
      )}
      {!loading && data && (
        <ul className="space-y-3">
          {data[dataKey].map((post, i) =>
            post.id === "optimisticResponse" ? (
              <SkeletonPostCard key={i} />
            ) : (
              <PostCard key={i} post={post} />
            )
          )}
        </ul>
      )}
      {!loading && data[dataKey].length === 0 && <EmptyPlaceholder />}
    </>
  );
};

export default PostList;
