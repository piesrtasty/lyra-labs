import React, { useState, useContext } from "react";
import styled from "@emotion/native";
import { useMutation } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArchive, faTrashAlt } from "@fortawesome/pro-light-svg-icons";

import { formatDate } from "@shared/utils";

import { NEW_ARCHIVE_POST } from "@data/mutations";
import { postFields } from "@data/fragments";
// import { NEW_ARCHIVE_POST } from "@data/mutations";

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
  const [newArchivePost] = useMutation(NEW_ARCHIVE_POST, {
    update(cache, { data: { newArchivePost: archivedPost } }) {
      console.log(">>> archivedPost <<<<", archivedPost);
      console.log("in the update function -> cache", cache);
      cache.modify({
        fields: {
          newSavedPosts(savedPostRefs = [], { readField }) {
            return savedPostRefs.filter(
              (savedPostRef) =>
                archivedPost.id !== readField("id", savedPostRef)
            );
          },
          newArchivedPosts(existingArchivedPosts = []) {
            const newArchivedPostRef = cache.writeFragment({
              data: archivedPost,
              fragment: postFields,
            });
            return [newArchivedPostRef, ...existingArchivedPosts];
          },
        },
      });
      //   cache.modify({
      //     fields: {
      //       todos(existingTodos = []) {
      //         const newTodoRef = cache.writeFragment({
      //           data: addTodo,
      //           fragment: gql`
      //             fragment NewTodo on Todo {
      //               id
      //               type
      //             }
      //           `
      //         });
      //         return [...existingTodos, newTodoRef];
      //       }
      //     }
      //   });
    },
  });

  const handleArchivePress = () => {
    newArchivePost({ variables: { postId: post.id } })
      .then(({ data }) => {
        console.log("data returned from archive press", data);
        //   setIsSaved(true);
        //   const newSavedPostId = data.saveExistingPost.id;
        //   setSavedId(newSavedPostId);
      })
      .catch((e) => console.log("e", e));
    console.log("pressing handleArchivePress");
  };

  const handleRemovePress = () => {
    console.log("pressing handleRemovePress");
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
          <PressableAction
            style={{ marginRight: 10 }}
            onPress={handleArchivePress}
          >
            {({ pressed }) => (
              <Action opacity={pressed ? 0.4 : 1}>
                <FontAwesomeIcon
                  style={{ marginRight: 5 }}
                  size={15}
                  color={`rgba(255, 255, 255, ${1})`}
                  icon={faArchive}
                />
                <ActionName>Archive</ActionName>
              </Action>
            )}
          </PressableAction>
          <PressableAction onPress={handleRemovePress}>
            {({ pressed }) => (
              <Action opacity={pressed ? 0.4 : 1}>
                <FontAwesomeIcon
                  style={{ marginRight: 5 }}
                  size={15}
                  color={`rgba(255, 255, 255, ${1})`}
                  icon={faTrashAlt}
                />
                <ActionName>Remove</ActionName>
              </Action>
            )}
          </PressableAction>
        </Actions>
      </BottomRow>
    </Container>
  );
};

export default React.memo(Post);
