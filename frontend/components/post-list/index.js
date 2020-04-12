import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  borderRadius: 5
});

const PostList = ({ dataKey, query }) => {
  const { loading, error, data, fetchMore } = useQuery(query, {});
  return (
    <Container>
      {!loading && (
        <Fragment>
          {data[dataKey].map(post =>
            post.id === "optimisticResponse" ? (
              <SkeletonPostCard />
            ) : (
              <PostCard post={post} />
            )
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default PostList;
