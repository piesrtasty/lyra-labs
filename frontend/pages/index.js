import { useQuery } from "@apollo/react-hooks";
import { Container, Main, Aside } from "../shared/library/components/layout";
import { POSTS_QUERY, CURRENT_USER_QUERY } from "../data/queries";
import Page from "../components/page";
import { withCurrentUser } from "../lib/withCurrentUser";

const IndexPage = ({ user }) => {
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData
  } = useQuery(POSTS_QUERY, {});
  return (
    <Page>
      <div>{JSON.stringify(postsData)}</div>
      <Main>main panel</Main>
      <Aside>Side Panel</Aside>
      {/* <div>{JSON.stringify(user)}</div> */}
      {/* <div>{JSON.stringify(user)}</div> */}
      {/* <Layout user={user} loading={userLoading}>
        <h1>Next.js and Auth0 Example</h1>

        {userLoading && <p>Loading login info...</p>}

        {!userLoading && !user && (
          <>
            <p>
              To test the login click in <i>Login</i>
            </p>
            <p>
              Once you have logged in you should be able to click in{" "}
              <i>Profile</i> and <i>Logout</i>
            </p>
          </>
        )}

        {user && (
          <>
            <h4>Rendered user info on the client</h4>
            <img src={user.picture} alt="user picture" />
            <p>nickname: {user.nickname}</p>
            <p>name: {user.name}</p>
          </>
        )}
      </Layout> */}
    </Page>
  );
};

export default withCurrentUser(IndexPage);
