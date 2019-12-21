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
  borderRadius: 5
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 20px 0 20px",
  padding: "20px 0 15px 0"
});

const Day = styled("div")({
  ...BASE_TEXT,
  fontSize: 20,
  fontWeight: WEIGHT.BOLD
});

const List = styled("ul")({
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  padding: 0,
  margin: 0,
  " > li:first-of-type > div:first-of-type": {
    borderTop: "none"
  }
});

const Navigation = styled("div")({
  ...BASE_TEXT,
  fontSize: 11,
  textTransform: "uppercase",
  " > a:first-child": {
    borderRight: `1px solid ${LILAC}`
  }
});

const Filter = styled("a")({
  padding: "0 .5em",
  cursor: "pointer"
});

const Footer = styled("div")({
  ...BASE_TEXT,
  backgroundColor: WHITE,
  borderTop: `1px solid ${LILAC}`,
  padding: 15,
  textAlign: "center",
  color: GUNSMOKE,
  cursor: "pointer",
  fontSize: 11,
  textTransform: "uppercase",
  "&:hover": {
    textDecoration: "underline"
  }
});

const StyledChevronDown = styled(ChevronDown)({
  marginRight: 5
});

const DEFAULT_VISIBLE = 10;

const PostList = ({ date, posts }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Container>
      <Header>
        <Day>{formatDate(date)}</Day>
        <Navigation>
          <Filter>Popular</Filter>
          <Filter>Newest</Filter>
        </Navigation>
      </Header>
      <List>
        {posts.map((post, index) => (
          <Post
            id={post.id}
            visible={showAll ? true : index < DEFAULT_VISIBLE}
            key={post.id}
            tagline={post.tagline}
            slug={post.slug}
            name={post.name}
            description={post.description}
            thumbnail={post.thumbnail}
            votesCount={post.votesCount}
            tags={post.topics}
            upvoted={post.upvoted}
          />
        ))}
        {!showAll && (
          <Footer onClick={() => setShowAll(true)}>
            <StyledChevronDown />
            {`Show ${posts.length - DEFAULT_VISIBLE} More`}
          </Footer>
        )}
      </List>
    </Container>
  );
};

export default PostList;
