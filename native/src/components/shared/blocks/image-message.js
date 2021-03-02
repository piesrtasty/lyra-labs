import React from "react";
import styled from "@emotion/native";
import { TitleDescriptionBlock } from "@components/shared";

import MagnifyingGlass from "@assets/images/magnifying-glass.svg";
import PhoneLightning from "@assets/images/phone-lightning.svg";
import Folder from "@assets/images/folder.svg";
import Telescope from "@assets/images/telescope.svg";

export const IMG_MSG_NO_POSTS_FOUND = "IMG_MSG_NO_POSTS_FOUND";
export const IMG_MSG_NO_MORE_POSTS_FOUND = "IMG_MSG_NO_MORE_POSTS_FOUND";
export const IMG_MSG_NO_POSTS_SAVED = "IMG_MSG_NO_POSTS_SAVED";
export const IMG_MSG_NO_POSTS_ARCHIVED = "IMG_MSG_NO_POSTS_ARCHIVED";
export const IMG_MSG_ERROR_POSTS = "IMG_MSG_ERROR_POSTS";
export const IMG_MSG_ERROR_SAVED_POSTS = "IMG_MSG_ERROR_SAVED_POSTS";
export const IMG_MSG_ERROR_ARCHIVED_POSTS = "IMG_MSG_ERROR_ARCHIVED_POSTS";

const IMAGE_MESSAGES = {
  [IMG_MSG_NO_POSTS_FOUND]: {
    title: "We couldn’t find any posts.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: MagnifyingGlass,
  },
  [IMG_MSG_NO_MORE_POSTS_FOUND]: {
    title: "That's everything!",
    description:
      "Please come back later and hopefully we will have some more posts.",
    Image: MagnifyingGlass,
  },
  [IMG_MSG_NO_POSTS_SAVED]: {
    title: "You don’t have anything saved yet.",
    description:
      "Save articles, videos and stories from any publication, page or app with the share extension.",
    Image: Telescope,
  },
  [IMG_MSG_NO_POSTS_ARCHIVED]: {
    title: "You don’t have anything archived yet.",
    description:
      "After you finish your saved articles, videos, and stories you can archive them and find them here.",
    Image: Folder,
  },
  [IMG_MSG_ERROR_SAVED_POSTS]: {
    title: "There was an issue retrieving your saved posts.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: PhoneLightning,
  },
  [IMG_MSG_ERROR_ARCHIVED_POSTS]: {
    title: "There was an issue retrieving your archived posts.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: PhoneLightning,
  },
  [IMG_MSG_ERROR_POSTS]: {
    title: "Oh no! Something went wrong.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: PhoneLightning,
  },
};

const Divider = styled.View`
  height: 20px;
`;

const Container = styled.View`
  align-items: center;
`;

export const ImageMessageBlock = ({ type, style = {} }) => {
  const { title, description, Image } = IMAGE_MESSAGES[type];

  return (
    <Container style={style}>
      <Image height={75} />
      <TitleDescriptionBlock
        title={title}
        description={description}
        style={{ marginTop: 50, maxWidth: 300 }}
      />
    </Container>
  );
};
