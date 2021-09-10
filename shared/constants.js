export const POST_TYPE_DEFAULT = "post-type-default";
export const POST_TYPE_SAVED = "post-type-saved";
export const POST_TYPE_ARCHIVED = "post-type-archived";

const ACTION_SAVE = "save";
const ACTION_ARCHIVE = "archive";
const ACTION_RESTORE = "restore";
const ACTION_SHARE = "share";
const ACTION_REMOVE = "remove";

const POST_TYPE_ACTIONS = {
  [POST_TYPE_DEFAULT]: [ACTION_SAVE],
  [POST_TYPE_SAVED]: [ACTION_ARCHIVE, ACTION_SHARE, ACTION_REMOVE],
  [POST_TYPE_ARCHIVED]: [ACTION_RESTORE, ACTION_SHARE, ACTION_REMOVE],
};
