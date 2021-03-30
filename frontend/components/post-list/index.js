import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { SAVED_POSTS } from "@data/queries";
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
  const { loading, error, data, fetchMore } = useQuery(SAVED_POSTS);
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
          {data.savedPosts.map((post, i) =>
            post.id === "optimisticResponse" ? (
              <SkeletonPostCard key={i} />
            ) : (
              <PostCard key={i} post={post} />
            )
          )}
        </Fragment>
      )}
      {!loading && data.savedPosts.length === 0 && <EmptyPlaceholder />}
    </Container>
  );
};

export default PostList;
