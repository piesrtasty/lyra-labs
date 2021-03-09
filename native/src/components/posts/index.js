import React, { useState } from "react";
import styled from "@emotion/native";
import { FlatList, RefreshControl } from "react-native";
import { useTheme } from "@emotion/react";
import { useQuery } from "@apollo/client";
import PostSkeleton from "@components/post/skeleton";
import Post from "@components/post";
import { CenterContainer, ImageMessageBlock } from "@components/shared";

const SkeletonContainer = styled.View`
  padding: 25px;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const EmptyContainer = styled(CenterContainer)`
  margin-top: 172px;
`;

const getCursor = (data = {}, key) => {
  const arr = data[key];
  return arr && arr.length > 0 ? arr[arr.length - 1].id : null;
};

const PostList = ({
  query,
  queryKey,
  msgNoPosts,
  msgNoMorePosts,
  msgError,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, error, loading, fetchMore, refetch } = useQuery(query);
  const [hasMoreData, setHasMoreData] = useState(true);

  if (error) {
    return (
      <EmptyContainer>
        <ImageMessageBlock type={msgError} />
      </EmptyContainer>
    );
  }

  const { colors } = useTheme();

  let posts = [];

  const renderItem = ({ item }) => <Post post={item} />;

  if (data && data[queryKey]) {
    posts = data[queryKey];
  }

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
    if (hasMoreData && !isLoadingMore) {
      setIsLoadingMore(true);
      fetchMore({
        variables: {
          cursor: getCursor(data, queryKey),
        },
      }).then(({ data }) => {
        setIsLoadingMore(false);
        console.log("posts", posts);
        if (data[queryKey].length === 0) {
          setHasMoreData(false);
        }
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refetch().then(({ data }) => {
      if (data && data[queryKey]) {
        posts = data[queryKey];
      }
      setIsRefreshing(false);
    });
  };

  const renderFooter = () => {
    if (!hasMoreData && !loading && posts.length > 0) {
      return (
        <>
          <Divider />
          <ImageMessageBlock type={msgNoMorePosts} />
        </>
      );
    }

    if (!isLoadingMore) return null;

    return (
      <>
        <Divider />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <EmptyContainer>
        <ImageMessageBlock type={msgNoPosts} />
      </EmptyContainer>
    );
  };

  return (
    <FlatList
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={Divider}
      data={posts}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={colors.secondary}
        />
      }
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1, padding: 25 }}
      onEndReachedThreshold={0.5}
      onEndReached={handleOnEndReached}
    />
  );
};

export default PostList;
