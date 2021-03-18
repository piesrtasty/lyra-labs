import React, { useState, useContext } from "react";
import styled from "@emotion/native";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark } from "@fortawesome/pro-light-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/pro-solid-svg-icons";
import { formatDate } from "@shared/utils";

import { SAVE_EXISTING_POST, REMOVE_EXISTING_POST } from "@data/mutations";

const POST_TYPE_DEFAULT = "post-type-default";
const POST_TYPE_SAVED = "post-type-saved";
const POST_TYPE_ARCHIVED = "post-type-archived";

import {
  Container,
  TopRow,
  BottomRow,
  LeftCol,
  RightCol,
  SourceMeta,
  SourceLogo,
  Title,
  SourceName,
  Meta,
  MetaDate,
  Thumbnail,
  Actions,
  Action,
  ActionName,
  PressableAction,
} from "./shared";

const Post = ({ post }) => {
  const formattedDate = formatDate(post.date);
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
        })
        .catch((e) => console.log("e", e));
    } else {
      saveExistingPost({ variables: { postId: post.id } })
        .then(({ data }) => {
          setIsSaved(true);
          const newSavedPostId = data.saveExistingPost.id;
          setSavedId(newSavedPostId);
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
