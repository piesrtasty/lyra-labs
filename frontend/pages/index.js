import { Container, Main, Aside } from "../shared/library/components/layout";
import styled from "@emotion/styled";
import Page from "../components/page";
import Sections from "../components/sections";
import { withCurrentUser } from "../lib/withCurrentUser";

const StyledContainer = styled(Container)({
  width: "100%"
});

const IndexPage = ({ user }) => {
  return (
    <Page>
      <StyledContainer>
        <Main>
          <Sections />
        </Main>
        <Aside>Side Panel</Aside>
      </StyledContainer>
    </Page>
  );
};

export default withCurrentUser(IndexPage);
