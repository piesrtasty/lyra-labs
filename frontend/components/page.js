import styled from "@emotion/styled";
import { Container, Column, Main } from "@library/components/layout";
import Header from "@components/header";
import Sidebar from "@components/sidebar";
import WalletPanel from "@components/wallet/panel";

const StyledContainer = styled(Container)({
  width: "100%"
});

const Page = ({ children }) => (
  <Column>
    <Header />
    <Column>
      <StyledContainer>
        <Sidebar />
        <Main>{children}</Main>
        {/* <Sidebar position={RIGHT}>
          <WalletPanel />
        </Sidebar> */}
      </StyledContainer>
    </Column>
  </Column>
);

export default Page;
