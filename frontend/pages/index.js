import React, { useContext } from "react";
import {
  Container,
  Main,
  Sidebar,
  Divider,
  LEFT,
  RIGHT
} from "../shared/library/components/layout";

import styled from "@emotion/styled";
import Page from "../components/page";
import Sections from "../components/sections";
import { SectionHeader } from "library/typography/headers";
import TopicList from "components/topic-list";
import UserCard from "components/user-card";
import SponsorList from "components/sponsor-list";
import { CURATED_TOPICS_QUERY } from "data/queries";
import WalletPanel from "../components/wallet/panel";
import { CurrentUserContext } from "enhancers/current-user";
import { withCurrentUser } from "../shared/enhancers/current-user";
import { withLoginModal } from "../shared/enhancers/login-modal";
import { flowRight as compose } from "lodash";
import CTALink from "library/buttons/cta-link";
import { SidebarSection } from "library/layout";

const StyledContainer = styled(Container)({
  width: "100%"
});

const StyledSectionHeader = styled(SectionHeader)({
  paddingBottom: 15
});

const StyledDivider = styled(Divider)({
  paddingTop: 4
});

const IndexPage = ({ user }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Page>
      <StyledContainer>
        <Sidebar>
          {currentUser && (
            <SidebarSection>
              <UserCard user={currentUser} />
            </SidebarSection>
          )}

          <TopicList query={CURATED_TOPICS_QUERY} dataKey={"curatedTopics"} />
          <SidebarSection>
            <CTALink path={"/tags"} text={"View all-time top tags"} />
          </SidebarSection>
          <SidebarSection>
            <StyledDivider />
          </SidebarSection>
          <SponsorList />
        </Sidebar>
        <Main>
          Goes here
          {/* <Sections /> */}
        </Main>
        <Sidebar position={RIGHT}>
          <WalletPanel />
        </Sidebar>
      </StyledContainer>
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(IndexPage);
