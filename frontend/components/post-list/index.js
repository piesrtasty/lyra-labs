import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { SAVED_POSTS, ARCHIVED_POSTS } from "@data/queries";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";
import EmptyPlaceholder from "./empty-placeholder";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  borderRadius: 5,
});

const PostList = ({ archived = false }) => {
  const query = archived ? ARCHIVED_POSTS : SAVED_POSTS;
  const dataKey = archived ? "archivedPosts" : "savedPosts";
  console.log("POSTS LIST -> archived", archived);

  const { loading, error, data, fetchMore } = useQuery(query);
  return (
    <Container>
      {loading && (
        <>
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
        </>
      )}
      {!loading && data && (
        <Fragment>
          {data[dataKey].map((post, i) =>
            post.id === "optimisticResponse" ? (
              <SkeletonPostCard key={i} />
            ) : (
              <PostCard key={i} post={post} />
            )
          )}
        </Fragment>
      )}
      {!loading && data[dataKey].length === 0 && <EmptyPlaceholder />}
    </Container>
  );
};

export default PostList;
