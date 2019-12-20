import React from "react";
import styled from "@emotion/styled";
import {
  BLACK,
  GUNSMOKE,
  LILAC,
  WHITE,
  RUBY,
  BLUSH,
  ALABASTER
} from "../../shared/style/colors";

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

export const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
});

const Post = () => {
  return <div>This is a post</div>;
};

export default Post;
