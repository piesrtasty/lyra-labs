import styled from "@emotion/styled";
import { WHITE, LILAC } from "../../style/colors";
import { TABLET } from "../../style/breakpoints";

const MAX_WIDTH = 1100;
const MIN_WIDTH = 320;

export const Container = styled("div")({
  margin: "auto",
  maxWidth: MAX_WIDTH,
  minWidth: MIN_WIDTH,
  display: "flex",
  padding: "0px 15px",
  boxSizing: "border-box"
});

export const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column"
});

export const Panel = styled("div")({
  backgroundColor: WHITE,
  padding: 20,
  borderRadius: 5,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)"
});

export const Main = styled("main")({
  flex: 1,
  maxWidth: 720,
  minWidth: 300
});

export const Aside = styled("aside")({
  [TABLET]: {
    display: "none"
  },
  marginLeft: 30,
  width: 320
});

export const Divider = styled("div")({
  borderBottom: `1px solid ${LILAC}`,
  width: "100%"
});
