import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import { DETROIT } from "../../shared/style/colors";
import { BOTTOM } from "../../shared/library/components/popovers/base";
import ListPopover from "../../shared/library/components/popovers/list";
import { HEADER_HEIGHT } from "./";

const AVATAR_DIMENSION = 40;

const Avatar = styled("img")({
  height: AVATAR_DIMENSION,
  width: AVATAR_DIMENSION,
  borderRadius: "50%",
  cursor: "pointer"
});

const Container = styled("div")({
  height: 60,
  display: "flex",
  alignItems: "center"
});

const UserAvatar = ({ user }) => {
  const LINKS = [
    { label: "My Profile", route: `@${user.username}` },
    { label: "Settings", route: "/my/settings/edit" },
    { label: "Logout", route: "/api/logout" }
  ];
  const anchor = (
    <Container>
      <Avatar src={user.avatar} />
    </Container>
  );
  return <ListPopover items={LINKS} anchor={anchor} position={BOTTOM} />;
};

export default UserAvatar;
