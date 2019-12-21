import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import {
  BLACK,
  GUNSMOKE,
  LILAC,
  WHITE,
  RUBY,
  BLUSH,
  ALABASTER
} from "../../shared/style/colors";

const ACCENT = BLUSH;

export const Container = styled("li")(
  {
    position: "relative",
    listStyleType: "none"
  },
  ({ visible }) => ({
    display: visible ? "block" : "none"
  })
);

export const Body = styled("div")({
  backgroundColor: WHITE,
  "&:hover": {
    backgroundColor: ALABASTER
  },
  padding: 20,
  display: "flex",
  flexDirection: "row",
  borderTop: `1px solid ${LILAC}`,
  cursor: "pointer"
});

const Wrapper = styled("div")({});

const Link = styled("a")({
  textDecoration: "none"
});

export const Thumbnail = styled("img")({
  width: 80,
  height: 80,
  marginRight: 10
});

export const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
});

const Name = styled("div")({
  ...BASE_TEXT,
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: WEIGHT.BOLD,
  color: BLACK
});

export const Tagline = styled("div")({
  ...BASE_TEXT,
  color: GUNSMOKE,
  lineHeight: "20px",
  marginBottom: 12
});

const Footer = styled("div")({
  display: "flex"
});

const VotesWrapper = styled("div")(
  {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: "translateY(-50%)",
    backgroundColor: WHITE,
    "&:hover": {
      backgroundColor: ALABASTER
    },
    border: `1px solid ${LILAC}`,
    borderRadius: 3
  },
  ({ upvoted }) => ({
    borderColor: upvoted ? RUBY : LILAC
  })
);

const Votes = styled("div")(
  {
    ...BASE_TEXT,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 74,
    width: 64,
    fontWeight: WEIGHT.BOLD
  },
  ({ upvoted }) => ({
    color: upvoted ? ACCENT : BLACK,
    " > svg": {
      width: 16,
      height: 11,
      marginBottom: 3,
      " > path": {
        fill: upvoted ? ACCENT : BLACK
      }
    }
  })
);

const Post = ({
  id,
  slug,
  name,
  tagline,
  description,
  thumbnail,
  tags,
  visible,
  votesCount,
  upvoted
}) => {
  return (
    <Container visible={visible}>
      <Wrapper>
        <Link href={`/posts/${slug}`}>
          <Body>
            <Thumbnail src={thumbnail} />
            <Content>
              <Name>{name}</Name>
              {/* <Tagline>{tagline}</Tagline> */}
              {/* <Footer>{tags.length > 0 && <TagList tags={tags} />}</Footer> */}
            </Content>
          </Body>
        </Link>
      </Wrapper>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  votesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  tags: PropTypes.array,
  visible: PropTypes.bool,
  upvoted: PropTypes.bool
};

export default Post;
