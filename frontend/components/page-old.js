import React, { useContext } from "react";
import styled from "@emotion/styled";
import { BASE_TEXT } from "@style/typography";
import { Container, Column, Main } from "@library/components/layout";
import { LAPTOP } from "../shared/style/breakpoints";
import { CurrentUserContext } from "@components/layout";
import Header from "@components/header";
import Sidebar from "@components/sidebar";

const StyledContainer = styled(Container)({
  width: "100%",
});

const MobileMsg = styled("div")({
  marginBottom: 10,
  display: "flex",
  [LAPTOP]: {
    display: "none",
  },
});

const Text = styled("div")({
  ...BASE_TEXT,
});

const Page = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Column>
      <Header />
      <Column>
        <StyledContainer>
          {currentUser && <Sidebar />}
          <Main>
            <MobileMsg>
              <Text>
                Not optimized for mobile devices yet. Some features may not be
                available (e.g. Flow Wallet) 🧐
              </Text>
            </MobileMsg>
            {children}
          </Main>
        </StyledContainer>
      </Column>
    </Column>
  );
};

export default Page;
