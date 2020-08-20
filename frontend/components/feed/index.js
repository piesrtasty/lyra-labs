import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { FEED_POSTS } from "@data/queries";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  borderRadius: 5,
});

const Feed = ({ archived = false }) => {
  const { loading, error, data, fetchMore } = useQuery(FEED_POSTS, {});
  return (
    <Container>
      <div>FEED</div>
      {loading && <SkeletonPostCard />}
      {!loading && data && (
        <Fragment>
          {data.feedPosts.map((post, i) =>
            post.id === "optimisticResponse" ? (
              <SkeletonPostCard key={i} />
            ) : (
              <PostCard key={i} post={post} />
            )
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default Feed;
