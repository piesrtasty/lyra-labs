import React, { useContext } from "react";
import styled from "@emotion/styled";
import {
  Sidebar as Container,
  SidebarSection,
} from "@library/components/layout";

import { Divider } from "@library/components/layout";

import UserCard from "@components/user-card";
import Nav from "./nav";
import { CurrentUserContext } from "@enhancers/current-user";

const StickySidebarSection = styled(SidebarSection)({
  position: "sticky",
  top: 77,
});

const StyledDivider = styled(Divider)({
  marginTop: 20,
  marginBottom: 20,
});

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Container>
      {currentUser && (
        <StickySidebarSection>
          <UserCard user={currentUser} />
          <Nav />
          <StyledDivider />
        </StickySidebarSection>
      )}
    </Container>
  );
};

export default Sidebar;
