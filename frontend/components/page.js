import styled from "@emotion/styled";
import { Container, Column, Main } from "@library/components/layout";
import Header from "@components/header";
import Sidebar from "@components/sidebar";
import WalletPanel from "@components/wallet/panel";

const StyledContainer = styled(Container)({
  width: "100%",
});

// const Wrapper = styled("div")({
//   fontSize:
// });

// font-size: var(--fs-base);
// width: 100%;
// max-width: var(--site-width);
// margin: 0 auto;
// display: grid;
// grid-gap: var(--layout-gap);
// grid-template-columns: var(--layout);
// padding: var(--layout-padding);
// }

const Page = ({ children }) => (
  <Column>
    <Header />
    <Column>
      <StyledContainer>
        <Sidebar />
        <Main>{children}</Main>
        <WalletPanel />
        {/* <Sidebar position={RIGHT}>
          <WalletPanel />
        </Sidebar> */}
      </StyledContainer>
    </Column>
  </Column>
);

export default Page;
