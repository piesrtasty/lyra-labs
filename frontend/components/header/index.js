import React, { Fragment, useContext, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "emotion-theming";
import { Container, Row } from "../../shared/library/components/layout";
import { CurrentUserContext } from "../../shared/enhancers/current-user";
import Logo from "./logo";
import Search from "./search";
import Navigation from "./navigation";
import AuthButtons from "./auth-buttons";
import UserAvatar from "./user-avatar";
import { GUNSMOKE, LILAC, WHITE } from "../../shared/style/colors";

const Wrapper = styled("header")(({ theme: { COLORS: { WHITE, LILAC } } }) => ({
  backgroundColor: WHITE,
  borderBottom: `1px solid ${LILAC}`,
  boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
  height: 66,
  display: "flex"
}));

const Avatar = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%"
});

const StyledContainer = styled(Container)({
  width: "100%",
  display: "flex",
  alignItems: "center"
});

const Actions = styled("div")({
  flexGrow: 1,
  display: "flex",
  justifyContent: "flex-end"
});

const Header = () => {
  const user = useContext(CurrentUserContext);
  return (
    <Wrapper>
      <StyledContainer>
        <Logo />
        <Search />
        <Navigation />
        <Actions>
          {
            <Fragment>
              {/* {user && <Avatar src={user.avatar} />} */}
              {user && <UserAvatar user={user} />}
              {!user && <AuthButtons />}
            </Fragment>
          }
        </Actions>
      </StyledContainer>
    </Wrapper>
  );
};

export default withTheme(Header);
