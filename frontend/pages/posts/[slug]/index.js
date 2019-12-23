import { useRouter } from "next/router";
import Page from "../../../components/page";
import Post from "../../../components/post";
import { withCurrentUser } from "../../../shared/enhancers/current-user";

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
