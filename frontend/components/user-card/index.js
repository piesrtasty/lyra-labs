import React from "react";
import styled from "@emotion/styled";

const AVATAR_DIMENSION = 48;

const Avatar = styled("img")({
  height: AVATAR_DIMENSION,
  width: AVATAR_DIMENSION,
  borderRadius: "50%"
});

const UserCard = ({ user }) => {
  console.log("user", user);
  const { avatar } = user;
  return (
    <div>
      <Avatar src={avatar} />
    </div>
  );
};

export default UserCard;
