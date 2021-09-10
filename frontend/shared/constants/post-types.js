import { SAVED_POSTS, ARCHIVED_POSTS, FEED_POSTS } from "@data/queries";

export const POST_TYPE_DEFAULT = "post-type-default";
export const POST_TYPE_SAVED = "post-type-saved";
export const POST_TYPE_ARCHIVED = "post-type-archived";

export const ACTION_SAVE = "save";
export const ACTION_ARCHIVE = "archive";
export const ACTION_RESTORE = "restore";
export const ACTION_SHARE = "share";
export const ACTION_REMOVE = "remove";

export const POST_TYPES = {
  [POST_TYPE_DEFAULT]: {
    actions: [ACTION_SAVE],
    query: FEED_POSTS,
    queryKey: "feedPosts",
  },
  [POST_TYPE_SAVED]: {
    actions: [ACTION_ARCHIVE, ACTION_SHARE, ACTION_REMOVE],
    query: SAVED_POSTS,
    queryKey: "savedPosts",
  },
  [POST_TYPE_ARCHIVED]: {
    actions: [ACTION_RESTORE, ACTION_SHARE, ACTION_REMOVE],
    query: ARCHIVED_POSTS,
    queryKey: "archivedPosts",
  },
};
