import { useRouter } from "next/router";
import { Container, Main, Aside } from "../../shared/library/components/layout";
import styled from "@emotion/styled";
// import { useMediaQuery } from "react-responsive";

const StyledContainer = styled(Container)({
  width: "100%"
});

const Post = ({}) => {
  //   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const router = useRouter();
  const { slug } = router.query;
  return (
    <StyledContainer>
      {/* {isTabletOrMobile ? "Mobile" : "Desktop"} */}
      <Main>{`Post data goes here, ${slug}`}</Main>
      <Aside>Side Panel</Aside>
    </StyledContainer>
  );
};

export default Post;
