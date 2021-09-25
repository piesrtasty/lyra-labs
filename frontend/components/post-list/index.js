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
import ShareModal from "@components/share-modal";
import NewBookmarkBtn from "@components/buttons/new-bookmark";
import ImageMessage from "@components/image-message";

import {
  BookmarkIcon,
  ArchiveIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";

import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/outline";

import Heading from "./heading";

import {
  POST_TYPES,
  POST_TYPE_DEFAULT,
  POST_TYPE_ARCHIVED,
  POST_TYPE_SAVED,
  ACTION_SAVE,
  ACTION_ARCHIVE,
  ACTION_RESTORE,
  ACTION_SHARE,
  ACTION_REMOVE,
} from "@shared/constants/post-types";

import {
  IMG_MSG_NO_POSTS_ARCHIVED,
  IMG_MSG_NO_POSTS_SAVED,
  IMG_MSG_NO_POSTS_FOUND,
  IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND,
  IMG_MSG_NO_MORE_SAVED_POSTS_FOUND,
  IMG_MSG_NO_MORE_POSTS_FOUND,
  IMG_MSG_ERROR_ARCHIVED_POSTS,
  IMG_MSG_ERROR_SAVED_POSTS,
  IMG_MSG_ERROR_POSTS,
} from "@components/image-message";

const NO_POSTS_MESSAGES = {
  [POST_TYPE_DEFAULT]: IMG_MSG_NO_POSTS_FOUND,
  [POST_TYPE_ARCHIVED]: IMG_MSG_NO_POSTS_ARCHIVED,
  [POST_TYPE_SAVED]: IMG_MSG_NO_POSTS_SAVED,
};

const NO_MORE_POSTS_MESSAGES = {
  [POST_TYPE_DEFAULT]: IMG_MSG_NO_MORE_POSTS_FOUND,
  [POST_TYPE_ARCHIVED]: IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND,
  [POST_TYPE_SAVED]: IMG_MSG_NO_MORE_SAVED_POSTS_FOUND,
};

const ERROR_MESSAGES = {
  [POST_TYPE_DEFAULT]: IMG_MSG_ERROR_POSTS,
  [POST_TYPE_ARCHIVED]: IMG_MSG_ERROR_ARCHIVED_POSTS,
  [POST_TYPE_SAVED]: IMG_MSG_ERROR_SAVED_POSTS,
};

const getCursor = (data = {}, key) => {
  const arr = data[key];
  return arr && arr.length > 0 ? arr[arr.length - 1].id : null;
};

const PostList = ({ title = "LOREM IPSUM", postType = POST_TYPE_DEFAULT }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const { query, queryKey, actions: postActions } = POST_TYPES[postType];
  const [hasNextPage, setHasNextPage] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(query);
  const observerRef = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);
  const [open, setOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [removePostId, setRemovePostId] = useState(null);
  const [newSavedPosts, setNewSavedPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

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
    setIsFetching(true);
    const cursor = getCursor(data, queryKey);
    fetchMore({
      variables: {
        cursor,
      },
    }).then(({ data }) => {
      const fetchedPosts = data[queryKey];
      setIsFetching(false);
      if (fetchedPosts.length === 0) {
        setHasNextPage(false);
      }
    });
  };

  const handleRemovePost = ({ id }) => {
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
    setOpen(false);
  };

  const handleArchiveClick = ({ id }) => {
    archivePost({ variables: { postId: id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const handleRestoreClick = ({ id }) => {
    restorePost({ variables: { postId: id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const handleShareClick = (post) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  const handleSaveClick = ({ id }) => {
    const isSaved = newSavedPosts.some((nsp) => nsp.hasOwnProperty(id));
    if (isSaved) {
      const removalItem = newSavedPosts.find((item) => item.hasOwnProperty(id));
      const removalId = removalItem[id];
      removePost({ variables: { postId: removalId } })
        .then(({ data }) => {
          setNewSavedPosts(
            newSavedPosts.filter((nsp) => !nsp.hasOwnProperty(id))
          );
        })
        .catch((e) => console.log("e", e));
    } else {
      saveExistingPost({ variables: { postId: id } })
        .then(({ data }) => {
          // Add new id to the newSavedPostsMap
          setNewSavedPosts([
            { [id]: data.saveExistingPost.id },
            ...newSavedPosts,
          ]);
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
  };

  const ACTIONS = {
    [ACTION_SAVE]: {
      // iconFn: (id) =>
      //   newSavedPosts.includes(id) ? BookmarkIcon : BookmarkIconOutline,
      iconFn: (id) =>
        newSavedPosts.some((nsp) => nsp.hasOwnProperty(id))
          ? BookmarkIcon
          : BookmarkIconOutline,
      name: "Save",
      fn: handleSaveClick,
    },
    [ACTION_ARCHIVE]: {
      iconFn: () => ArchiveIcon,
      name: "Archive",
      fn: handleArchiveClick,
    },
    [ACTION_RESTORE]: {
      iconFn: () => ArchiveIcon,
      name: "Restore",
      fn: handleRestoreClick,
    },
    [ACTION_SHARE]: {
      iconFn: () => ShareIcon,
      name: "Share",
      fn: handleShareClick,
    },
    [ACTION_REMOVE]: {
      iconFn: () => TrashIcon,
      name: "Remove",
      fn: handleRemovePost,
    },
  };

  const actions = postActions.map((pa) => ACTIONS[pa]);

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <RemoveModal
        open={open}
        setOpen={setOpen}
        onSubmit={onRemoveModalSubmit}
        onCancel={onRemoveModalCancel}
      />
      <ShareModal
        open={shareModalOpen}
        onClose={handleCloseShareModal}
        post={selectedPost}
      />
      <div className="hidden md:flex py-4 px-6 sticky top-0 flex flex-row justify-between bg-white z-10">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <NewBookmarkBtn />
      </div>
      {error && <ImageMessage type={ERROR_MESSAGES[postType]} />}
      {!loading && data && data[queryKey].length === 0 && (
        <ImageMessage type={NO_POSTS_MESSAGES[postType]} />
      )}
      {!loading && data && (
        <>
          <ul className="divide-y divide-gray-200">
            {data[queryKey].map((post, i) => (
              <>
                {post.id === "optimisticResponse" ? (
                  <LoadingPostCard />
                ) : (
                  <PostCard
                    key={i}
                    post={post}
                    postType={postType}
                    actions={actions}
                  />
                )}
              </>
            ))}
          </ul>
        </>
      )}
      {isFetching && (
        <ul className="space-y-3 mt-3">
          <LoadingPostCard />
          <LoadingPostCard />
        </ul>
      )}

      {!hasNextPage && !loading && data[queryKey].length > 0 && (
        <ImageMessage type={NO_MORE_POSTS_MESSAGES[postType]} />
      )}

      {hasNextPage && data && data[queryKey].length !== 0 && (
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
      )}
    </>
  );
};

export default PostList;
