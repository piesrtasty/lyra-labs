import { useRouter } from "next/router";
import {
  Container,
  Main,
  Aside
} from "../../../shared/library/components/layout";
import styled from "@emotion/styled";
import Page from "../../../components/page";
import Post from "../../../components/post";
import { withCurrentUser } from "../../../lib/withCurrentUser";

const StyledContainer = styled(Container)({
  width: "100%"
});

const PostPage = ({ user }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Page>
      <Post />
    </Page>
  );
};

export default withCurrentUser(PostPage);
