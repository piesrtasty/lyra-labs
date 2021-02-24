import React, { useState } from "react";
import styled from "@emotion/native";
import { View, FlatList, ActivityIndicator } from "react-native";
import { NEW_FEED_POSTS } from "@data/queries";
import { useQuery } from "@apollo/client";
import PostSkeleton from "@components/post/skeleton";
import Post from "@components/post";
import { CenterContainer, FullContainer } from "@components/shared";

import MagnifyingGlass from "@assets/images/magnifying-glass.svg";

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

const SkeletonContainer = styled.View`
  padding: 25px;
`;

// const getData = (data, key) => {

// }

const Row = styled.View`
  height: 100px;
  background-color: pink;
  margin: 10px;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const EmptyContainer = styled(CenterContainer)`
  ${"" /* background-color: pink; */}
  margin-top: 172px;
`;

const getCursor = (data, key) => {
  const arr = data[key];
  return arr[arr.length - 1].id;
};

const PostList = () => {
  const [cursor, setCursor] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data, error, loading, fetchMore } = useQuery(NEW_FEED_POSTS);
  const [hasMoreData, setHasMoreData] = useState(true);

  let posts = [];

  const renderItem = ({ item }) => <Post post={item} />;

  //   if (data && data.newFeedPosts) {
  //     posts = data.newFeedPosts;
  //   }

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

  const handleOnEndReached = () => {
    if (hasMoreData) {
      setIsLoadingMore(true);
      fetchMore({
        variables: {
          cursor: cursor ? cursor : getCursor(data, QUERY_KEY),
        },
      }).then(({ data }) => {
        setIsLoadingMore(false);
        if (data.newFeedPosts.length === 0) {
          setHasMoreData(false);
        }
      });
    }
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View>
        <Divider />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <EmptyContainer>
        <MagnifyingGlass width={105} height={75} />
      </EmptyContainer>
    );
  };

  return (
    <FlatList
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={Divider}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1, padding: 25 }}
      onEndReachedThreshold={0.5}
      onEndReached={handleOnEndReached}
    />
  );
};

export default PostList;
