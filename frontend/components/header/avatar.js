import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { POSTS_QUERY, CURRENT_USER_QUERY } from "../../data/queries";
import { withApollo } from "../../lib/apollo";
const UserAvatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Avatar = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
  console.log("data", data);
  //   return <UserAvatar src={avatar} />;
  //   if (loading) return <p>Loading ...</p>;
  //   if (error) return <p>{error}</p>;
  return <div>{JSON.stringify(data)}</div>;
};

export default withApollo(Avatar);
