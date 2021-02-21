import React, { useState } from "react";
import styled from "@emotion/native";
import { View, FlatList } from "react-native";
import { NEW_FEED_POSTS } from "@data/queries";
import { useQuery } from "@apollo/client";
import PostSkeleton from "@components/post/skeleton";
import Post from "@components/post";

const Container = styled.View`
  padding: 25px;
  flex: 1;
`;

const QUERY_KEY = "newFeedPosts";

const Item = styled.View`
  height: 40px;
  background-color: blue;
  width: 100%;
`;

const Copy = styled.Text`
  color: white;
`;

const SkeletonContainer = styled.View`
  padding: 25px;
`;

const getCursor = (data, key) => {
  const arr = data[key];
  return arr[arr.length - 1].id;
  // return arr[key][a];
};

const PostList = () => {
  const [cursor, setCursor] = useState(null);
  const { data, error, loading, fetchMore } = useQuery(NEW_FEED_POSTS);

  let posts = [];

  //   if (data && data.newFeedPosts) {
  //     posts = data.newFeedPosts;
  //   }

  if (data && data.newFeedPosts) {
    posts = data.newFeedPosts;
  }

  // first time loading
  if (loading && posts.length === 0) {
    return (
      <SkeletonContainer>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </SkeletonContainer>
    );
  }

  // const handlePress = async () => {
  //   // consolse.log("pressed", data.newFeedPosts[data.newFeedPosts.length - 1].id);
  //   // console.log(fetchMore);
  //   console.log("cursor", cursor);
  //   console.log("NEW_FEED_POSTS", NEW_FEED_POSTS);

  // };

  const handleOnEndReached = () => {
    fetchMore({
      variables: {
        cursor: cursor ? cursor : getCursor(data, QUERY_KEY),
      },
    }).then(({ data }) => {
      console.log("fetchMore data", data);

      const newCursor = getCursor(data, QUERY_KEY);
      console.log("newCursor", newCursor);
    });
    // console.log("calling on end reached", data);
  };

  const renderItem = ({ item }) => <Post post={item} />;

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1, padding: 25 }}
      onEndReachedThreshold={1}
      onEndReached={handleOnEndReached}
    />
  );
};

export default PostList;
