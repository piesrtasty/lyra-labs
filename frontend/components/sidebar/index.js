import React, { useContext } from "react";
import {
  Sidebar as Container,
  SidebarSection
} from "@library/components/layout";
import UserCard from "@components/user-card";
import Nav from "./nav";
import { CurrentUserContext } from "@enhancers/current-user";
import TopicList from "@components/topic-list";
import SponsorList from "@components/sponsor-list";

const Sidebar = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Container>
      {currentUser && (
        <SidebarSection>
          <UserCard user={currentUser} />
          <Nav />
        </SidebarSection>
      )}
      {/* <TopicList query={CURATED_TOPICS_QUERY} dataKey={"curatedTopics"} /> */}
      {/* <SidebarSection>
            <CTALink path={"/tags"} text={"View all-time top tags"} />
          </SidebarSection>
          <SidebarSection>
            <StyledDivider />
          </SidebarSection>
          <SponsorList /> */}
    </Container>
  );
};

export default Sidebar;
