import { useQuery } from "@apollo/react-hooks";
import * as compose from "lodash.flowright";
import auth0 from "../lib/auth0";
import { Container, Main, Aside } from "../shared/library/components/layout";
import { POSTS_QUERY, CURRENT_USER_QUERY } from "../data/queries";
import { withApollo } from "../lib/apollo";

import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";
import { withCurrentUser } from "../lib/withCurrentUser";

const IndexPage = ({ user }) => {
  // console.log("props", props.user);
  // const { user, loading: userLoading } = useFetchUser();
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData
  } = useQuery(POSTS_QUERY, {});

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    variables: { auth0Id: user.sub }
  });

  // console.log("");
  // console.log("error", error);
  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>{error}</p>;
  // return <h1>Hello {JSON.stringify(data)}!</h1>;
  return (
    <div>
      <Container>
        <div>Index</div>
        <div>{JSON.stringify(postsData)}</div>
        <Main>main panel</Main>
        <Aside>Side Panel</Aside>
      </Container>
      <div>{JSON.stringify(user)}</div>
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
    </div>
  );
};

// IndexPage.getInitialProps = async ({ req, res }) => {
//   const session = await auth0.getSession(req);
//   const user = session && session.user ? session.user : null;
//   return { user };
// };

// export default IndexPage;
// export default withApollo(IndexPage);

export default compose(withApollo, withCurrentUser)(IndexPage);
