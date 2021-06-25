import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import {
  ARCHIVE_POST,
  RESTORE_POST,
  SAVE_EXISTING_POST,
  REMOVE_POST,
} from "@data/mutations";
import { postFields } from "@data/fragments";
import PostCard from "../post-card";
import LoadingPostCard from "../post-card/loading";
import RemoveModal from "@components/remove-modal";

import {
  BookmarkIcon,
  ArchiveIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";

import Heading from "./heading";

import {
  POST_TYPES,
  POST_TYPE_DEFAULT,
  ACTION_SAVE,
  ACTION_ARCHIVE,
  ACTION_RESTORE,
  ACTION_SHARE,
  ACTION_REMOVE,
} from "@shared/constants/post-types";

const getCursor = (data = {}, key) => {
  const arr = data[key];
  return arr && arr.length > 0 ? arr[arr.length - 1].id : null;
};

const PostList = ({ title = "LOREM IPSUM", postType = POST_TYPE_DEFAULT }) => {
  const { query, queryKey, actions: postActions } = POST_TYPES[postType];
  const [hasNextPage, setHasNextPage] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(query);
  const observerRef = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);
  const [open, setOpen] = useState(false);
  const [removePostId, setRemovePostId] = useState(null);

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

  const [saveExistingPost] = useMutation(SAVE_EXISTING_POST);

  const [archivePost] = useMutation(ARCHIVE_POST, {
    update(cache, { data: { archivePost: archivedPost } }) {
      cache.modify({
        fields: {
          savedPosts(savedPostRefs = [], { readField }) {
            return savedPostRefs.filter(
              (savedPostRef) =>
                archivedPost.id !== readField("id", savedPostRef)
            );
          },
          archivedPosts(existingArchivedPosts = []) {
            const archivedPostRef = cache.writeFragment({
              data: archivedPost,
              fragment: postFields,
            });
            return [archivedPostRef, ...existingArchivedPosts];
          },
        },
      });
    },
  });

  const [restorePost] = useMutation(RESTORE_POST, {
    update(cache, { data: { restorePost: restoredPost } }) {
      cache.modify({
        fields: {
          archivedPosts(archivedPostRefs = [], { readField }) {
            return archivedPostRefs.filter(
              (archivedPostRef) =>
                restoredPost.id !== readField("id", archivedPostRef)
            );
          },
          savedPosts(existingSavedPosts = []) {
            const savedPostRef = cache.writeFragment({
              data: restoredPost,
              fragment: postFields,
            });
            return [savedPostRef, ...existingSavedPosts];
          },
        },
      });
    },
  });

  const [removePost] = useMutation(REMOVE_POST, {
    update(cache, { data: { removePost: removedPost } }) {
      cache.modify({
        fields: {
          savedPosts(savedPostRefs = [], { readField }) {
            return savedPostRefs.filter(
              (savedPostRef) => removedPost.id !== readField("id", savedPostRef)
            );
          },
          archivedPosts(archivedPostRefs = [], { readField }) {
            return archivedPostRefs.filter(
              (archivedPostRef) =>
                removedPost.id !== readField("id", archivedPostRef)
            );
          },
        },
      });
    },
  });

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

  const fn = () => {
    console.log("clicked....", postType);
  };

  const handleRemovePost = (id) => {
    setRemovePostId(id);
    setOpen(true);
  };

  const onRemoveModalSubmit = () => {
    removePost({ variables: { postId: removePostId } })
      .then(({ data }) => {
        setRemovePostId(null);
        setOpen(false);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const onRemoveModalCancel = () => {
    console.log("onRemoveModalCancel");
    setOpen(false);
  };

  const handleArchiveClick = (id) => {
    archivePost({ variables: { postId: id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const handleRestoreClick = (id) => {
    restorePost({ variables: { postId: id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const ACTIONS = {
    [ACTION_SAVE]: {
      Icon: BookmarkIcon,
      name: "Save",
      fn: fn,
    },
    [ACTION_ARCHIVE]: {
      Icon: ArchiveIcon,
      name: "Archive",
      fn: handleArchiveClick,
    },
    [ACTION_RESTORE]: {
      Icon: ArchiveIcon,
      name: "Restore",
      fn: handleRestoreClick,
    },
    [ACTION_SHARE]: { Icon: ShareIcon, name: "Share", fn: fn },
    [ACTION_REMOVE]: { Icon: TrashIcon, name: "Remove", fn: handleRemovePost },
  };

  const actions = postActions.map((pa) => ACTIONS[pa]);

  return (
    <>
      <RemoveModal
        open={open}
        setOpen={setOpen}
        onSubmit={onRemoveModalSubmit}
        onCancel={onRemoveModalCancel}
      />
      <Heading title={title} />
      {!loading && data && (
        <ul className="space-y-3">
          {data[queryKey].map((post, i) => (
            <PostCard
              key={i}
              post={post}
              postType={postType}
              actions={actions}
            />
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
