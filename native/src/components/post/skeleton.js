import React from "react";
import styled from "@emotion/native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Divider } from "./";

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const LeftCol = styled.View`
  flex-grow: 1;
`;

const RightCol = styled.View``;

const HIGHLIGHT_COLOR = "rgba(18, 18, 23, 0.3)";
const BONE_COLOR = "#333333";

const LEFT_LAYOUT = [
  {
    key: "top-row",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    children: [
      {
        key: "source-logo",
        width: 25,
        height: 25,
      },
      {
        key: "source-name",
        width: 75,
        height: 15,
        marginLeft: 8,
      },
    ],
  },
  { key: "title-top-line", width: 200, height: 18, marginBottom: 4 },
  {
    key: "title-bottom-line",
    width: 175,
    height: 18,
    marginBottom: 10,
  },
  {
    key: "meta",
    flexDirection: "row",
    alignItems: "center",
    width: 110,
    height: 15,
  },
];

const RIGHT_LAYOUT = [
  {
    key: "image-container",
    flexGrow: 1,
    justifyContent: "center",
    children: [
      {
        key: "image",
        width: 90,
        height: 60,
      },
    ],
  },
  {
    key: "actions",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    width: 34,
    height: 13,
  },
];

const SkeletonPost = ({ hasDivider = true }) => {
  return (
    <>
      <Container>
        <LeftCol>
          <SkeletonContent
            isLoading={true}
            containerStyle={{}}
            boneColor={BONE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            layout={LEFT_LAYOUT}
          />
        </LeftCol>
        <RightCol>
          <SkeletonContent
            isLoading={true}
            containerStyle={{ flex: 1 }}
            boneColor={BONE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            layout={RIGHT_LAYOUT}
          />
        </RightCol>
      </Container>
      {hasDivider && <Divider />}
    </>
  );
};

export default SkeletonPost;
