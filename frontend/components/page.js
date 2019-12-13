import { Container, Column } from "../shared/library/components/layout";
import Header from "./header";
import styled from "@emotion/styled";

const Page = ({ children }) => (
  <Column>
    <Header />
    <Container>
      <Column>{children}</Column>
    </Container>
  </Column>
);

export default Page;
