import React, { useState, useContext } from "react";
import styled from "@emotion/native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark } from "@fortawesome/pro-light-svg-icons";
dayjs.extend(advancedFormat);
import { Heading, RegularText, MediumText } from "@components/shared";

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.View`
  flex-direction: row;
`;

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LeftCol = styled.View`
  flex-grow: 1;
  flex: 1;
`;

const RightCol = styled.View`
  justify-content: center;
  margin-left: 15px;
`;

const SourceMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SourceLogo = styled.Image`
  height: 25px;
  width: 25px;
  background-color: white;
  margin-right: 8px;
`;

const Title = styled(Heading)`
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const SourceName = styled(MediumText)`
  font-size: 13px;
  color: ${(props) => props.theme.colors.secondary};
`;

const Meta = styled.View``;

const MetaDate = styled(RegularText)``;

const Thumbnail = styled.Image`
  width: 90px;
  height: 60px;
`;

const Actions = styled.View``;

const Action = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionName = styled(MediumText)``;

const Wrapper = styled.View`
  ${"" /* flex: 1; */}
  ${"" /* flex: 0; */}
`;

const Post = ({ post, hasDivider = true }) => {
  const formattedDate = dayjs(post.date).format("MMMM Do");
  return (
    <Container>
      <TopRow>
        <LeftCol>
          <SourceMeta>
            <SourceLogo resizeMode={"contain"} source={{ uri: post.logo }} />
            <SourceName>{post.publisher}</SourceName>
          </SourceMeta>
          <Title>{post.title}</Title>
        </LeftCol>
        <RightCol>
          <Thumbnail source={{ uri: post.image }} />
        </RightCol>
      </TopRow>
      <BottomRow>
        <Meta>
          <MetaDate>{formattedDate}</MetaDate>
        </Meta>
        <Actions>
          <Action>
            <FontAwesomeIcon
              style={{ marginRight: 5 }}
              size={15}
              color={`rgba(255, 255, 255, ${1})`}
              icon={faBookmark}
            />
            <ActionName>Save</ActionName>
          </Action>
        </Actions>
      </BottomRow>
    </Container>
    // {hasDivider && <Divider />}
  );
};

export default React.memo(Post);
