import { Container, Main, Aside } from "../shared/library/components/layout";
import styled from "@emotion/styled";
import Page from "../components/page";
import Sections from "../components/sections";
import WalletPanel from "../components/wallet/panel";
import { withCurrentUser } from "../shared/enhancers/current-user";
import { withLoginModal } from "../shared/enhancers/login-modal";
import { flowRight as compose } from "lodash";

const StyledContainer = styled(Container)({
  width: "100%",
  marginTop: 30
});

const IndexPage = ({ user }) => {
  return (
    <Page>
      <StyledContainer>
        <Main>
          <Sections />
        </Main>
        <Aside>
          <WalletPanel />
        </Aside>
      </StyledContainer>
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(IndexPage);
