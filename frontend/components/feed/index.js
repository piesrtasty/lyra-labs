import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { FEED_POSTS } from "@data/queries";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";
import EmptyPlaceholder from "../post-list/empty-placeholder";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  borderRadius: 5,
});

const Feed = ({ archived = false, currentUser = null }) => {
  const { loading, error, data, fetchMore } = useQuery(FEED_POSTS, {});

  return (
    <>
      <Container>
        {loading && (
          <>
            <SkeletonPostCard />
            <SkeletonPostCard />
            <SkeletonPostCard />
          </>
        )}
        {!loading && data && data.feedPosts && (
          <Fragment>
            {data.feedPosts.map((post, i) =>
              post.id === "optimisticResponse" ? (
                <SkeletonPostCard key={i} />
              ) : (
                <PostCard key={i} post={post} currentUser={currentUser} />
              )
            )}
          </Fragment>
        )}
        {!loading && data && data.feedPosts && data.feedPosts.length === 0 && (
          <EmptyPlaceholder />
        )}
      </Container>
    </>
  );
};

export default Feed;
