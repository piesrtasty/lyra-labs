import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { SAVED_POSTS, ARCHIVED_POSTS } from "@data/queries";
import PostCard from "../post-card";
import LoadingPostCard from "../post-card/loading";

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

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  const fetchResults = () => {
    const cursor = getCursor(data, queryKey);
    fetchMore({
      variables: {
        cursor,
      },
    }).then(({ data }) => {
      const fetchedPosts = data[queryKey];
      if (fetchedPosts.length === 0) {
        setHasNextPage(false);
      }
    });
  };

  return (
    <>
      <Heading title={title} />
      {!loading && data && (
        <ul className="space-y-3">
          {data[queryKey].map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </ul>
      )}

      {(loading || hasNextPage) && (
        <>
          <ul className="space-y-3 mt-3">
            <LoadingPostCard />
            <LoadingPostCard />
          </ul>
          <div className="p-8 justify-center flex">
            <button
              ref={setButtonRef}
              id="buttonLoadMore"
              onClick={() => fetchResults()}
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Load More
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PostList;
