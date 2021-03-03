import React, { useState, useContext } from "react";
import styled from "@emotion/native";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark } from "@fortawesome/pro-light-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/pro-solid-svg-icons";
dayjs.extend(advancedFormat);
import { Heading, RegularText, MediumText } from "@components/shared";

import { SAVE_EXISTING_POST, REMOVE_EXISTING_POST } from "@data/mutations";

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

const PressableAction = styled.Pressable``;

const Post = ({ post, hasDivider = true }) => {
  const formattedDate = dayjs(post.date).format("MMMM Do");
  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState(null);

  const [saveExistingPost] = useMutation(SAVE_EXISTING_POST);
  const [removeExistingPost] = useMutation(REMOVE_EXISTING_POST);

  const handleSavePress = () => {
    console.log("pressing handleSavePress");
    if (isSaved) {
      removeExistingPost({ variables: { postId: savedId } })
        .then(({ data }) => {
          setIsSaved(false);
          setSavedId(null);
          console.log("returned data from remove", data);
          // setIsLoading(false);
          // hideOnboarding();
        })
        .catch((e) => console.log("e", e));
    } else {
      saveExistingPost({ variables: { postId: post.id } })
        .then(({ data }) => {
          setIsSaved(true);
          const newSavedPostId = data.saveExistingPost.id;
          setSavedId(newSavedPostId);
          console.log("returned data", data);
          console.log("newSavedPostId", newSavedPostId);
          // setIsLoading(false);
          // hideOnboarding();
        })
        .catch((e) => console.log("e", e));
    }
  };

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
          <PressableAction onPress={handleSavePress}>
            <Action>
              <FontAwesomeIcon
                style={{ marginRight: 5 }}
                size={15}
                color={`rgba(255, 255, 255, ${1})`}
                icon={isSaved ? faBookmarkSolid : faBookmark}
              />
              <ActionName>{isSaved ? "Saved" : "Save"}</ActionName>
            </Action>
          </PressableAction>
        </Actions>
      </BottomRow>
    </Container>
  );
};

export default React.memo(Post);
