import React, { Fragment, useState, useEffect, useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { SAVED_POSTS, ARCHIVED_POSTS } from "@data/queries";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";
import EmptyPlaceholder from "./empty-placeholder";
import Heading from "./heading";

import { POST_TYPE_DEFAULT } from "../post-card";

const getCursor = (data = {}, key) => {
  const arr = data[key];
  return arr && arr.length > 0 ? arr[arr.length - 1].id : null;
};

const PostList = ({
  archived = false,
  title = "LOREM IPSUM",
  postType = POST_TYPE_DEFAULT,
}) => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const query = archived ? ARCHIVED_POSTS : SAVED_POSTS;
  const queryKey = archived ? "archivedPosts" : "savedPosts";
  const { loading, error, data, fetchMore } = useQuery(query);

  const observerRef = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);

  useEffect(() => {
    const options = {
      root: document.querySelector("#list"),
      threshold: 0.1,
    };
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        entry.target.click();
      }
    }, options);
  }, []);

  useEffect(() => {
    if (buttonRef) {
      observerRef.current.observe(document.querySelector("#buttonLoadMore"));
    }
  }, [buttonRef]);

  // const [sentryRef] = useInfiniteScroll({
  //   loading,
  //   hasNextPage,
  //   onLoadMore: () => {
  //     console.log("CALLIGNG on Load More");
  //     fetchMore({
  //       variables: {
  //         // cursor: getCursor(data, queryKey),
  //       },
  //     }).then(({ data }) => {
  //       console.log("called fetch ore", data);
  //       if (data[queryKey].length === 0) {
  //         setHasMoreData(false);
  //       }
  //     });
  //   },
  //   // When there is an error, we stop infinite loading.
  //   // It can be reactivated by setting "error" state as undefined.
  //   disabled: !!error,
  //   // `rootMargin` is passed to `IntersectionObserver`.
  //   // We can use it to trigger 'onLoadMore' when the sentry comes near to become
  //   // visible, instead of becoming fully visible on the screen.
  //   rootMargin: "0px 0px 400px 0px",
  // });

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <>
      {/* <div>{JSON.stringify(data)}</div> */}
      <Heading title={title} />
      {!loading && data && (
        <ul className="space-y-3">
          {data[queryKey].map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </ul>
      )}

      {hasNextPage && (
        <div>
          <button
            // className={styles.btn}
            size="mini"
            ref={setButtonRef}
            id="buttonLoadMore"
            // disabled={isRefetching}
            // loading={isRefetching}
            onClick={() => {
              console.log("clicked");
              // fetchMore({
              //   variables: {
              //     first,
              //     after: data.streetNames.pageInfo.endCursor,
              //     delay,
              //   },
              // })
            }}
          >
            load more
          </button>
        </div>
      )}
      {/* {(loading || hasNextPage) && (
        <div ref={sentryRef}>---------------LOADING ---------------</div>
      )} */}
      {/* {!loading && data[queryKey].length === 0 && <EmptyPlaceholder />} */}
    </>
  );
};

export default PostList;
