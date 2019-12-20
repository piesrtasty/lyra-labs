import React, { useState } from "react";
import styled from "@emotion/styled";
import { LILAC, WHITE, GUNSMOKE } from "../../shared/style/colors";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import Post from "../post";
import { formatDate } from "../../shared/utils";
import ChevronDown from "../../shared/style/icons/chevron-down.svg";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  height: 100,
  borderRadius: 5
});

const PostList = ({ date, posts }) => {
  return (
    <Container>
      {posts.map((post, index) => (
        <Post
        // id={post.id}
        // visible={showAll ? true : index < DEFAULT_VISIBLE}
        // key={post.id}
        // tagline={post.tagline}
        // slug={post.slug}
        // name={post.name}
        // description={post.description}
        // thumbnail={post.thumbnail}
        // votesCount={post.votesCount}
        // tags={post.topics}
        // upvoted={post.upvoted}
        />
      ))}
    </Container>
  );
};

export default PostList;
