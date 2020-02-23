import React from "react";
import styled from "@emotion/styled";
import Popover, { BOTTOM } from "../../shared/library/components/popovers/base";

const Avatar = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%"
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 15
});

const Link = styled("a")({});

const UserAvatar = ({ user }) => {
  // console.log("user", user);

  const LINKS = [
    { name: "My Profile", route: `@${user.username}` },
    { name: "Settings", route: "/my/settings/edit" },
    { name: "Logout", route: "/api/logout" },
    { name: "My Profile", route: `@${user.username}` },
    { name: "Settings", route: "/my/settings/edit" },
    { name: "Logout", route: "/api/logout" }
  ];

  const anchor = <Avatar src={user.avatar} />;
  const content = (
    <Content>
      {LINKS.map(({ name, route }) => (
        <Link>{name}</Link>
      ))}
    </Content>
  );

  return <Popover anchor={anchor} content={content} position={BOTTOM} />;
};

export default UserAvatar;
