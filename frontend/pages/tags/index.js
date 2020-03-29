import { Container, Main, Sidebar, Divider, LEFT, RIGHT } from "library/layout";
import Link from "next/link";
import styled from "@emotion/styled";
import Page from "components/page";
import Sections from "components/sections";
import { SectionHeader } from "library/typography/headers";
import { withCurrentUser } from "enhancers/current-user";
import { withLoginModal } from "enhancers/login-modal";
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

const TagsPage = ({ user }) => {
  return (
    <Page>
      <StyledContainer>
        <Sidebar>Left</Sidebar>
        <Main>Middle</Main>
        <Sidebar position={RIGHT}>Right</Sidebar>
      </StyledContainer>
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(TagsPage);
