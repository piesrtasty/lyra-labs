export const IMG_MSG_NO_POSTS_FOUND = "IMG_MSG_NO_POSTS_FOUND";
export const IMG_MSG_NO_MORE_POSTS_FOUND = "IMG_MSG_NO_MORE_POSTS_FOUND";
export const IMG_MSG_ERROR_POSTS = "IMG_MSG_ERROR_POSTS";

export const IMG_MSG_NO_POSTS_SAVED = "IMG_MSG_NO_POSTS_SAVED";
export const IMG_MSG_NO_MORE_SAVED_POSTS_FOUND =
  "IMG_MSG_NO_MORE_SAVED_POSTS_FOUND";
export const IMG_MSG_ERROR_SAVED_POSTS = "IMG_MSG_ERROR_SAVED_POSTS";

export const IMG_MSG_NO_POSTS_ARCHIVED = "IMG_MSG_NO_POSTS_ARCHIVED";
export const IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND =
  "IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND";
export const IMG_MSG_ERROR_ARCHIVED_POSTS = "IMG_MSG_ERROR_ARCHIVED_POSTS";

const MagnifyingGlass = (
  <img
    className="h-24 w-auto"
    src="/magnifying-glass.svg"
    alt="Magnifying Glass"
  />
);
const Telescope = (
  <img className="h-24 w-auto" src="/telescope.svg" alt="Telescope" />
);
const Folder = <img className="h-24 w-auto" src="/folder.svg" alt="Folder" />;
const PhoneLightning = (
  <img
    className="h-24 w-auto"
    src="/phone-lightning.svg"
    alt="Phone Lightning"
  />
);

const IMAGE_MESSAGES = {
  [IMG_MSG_NO_POSTS_FOUND]: {
    title: "We couldn’t find any posts.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: MagnifyingGlass,
  },
  [IMG_MSG_NO_MORE_POSTS_FOUND]: {
    title: "That's everything!",
    description:
      "Please come back later and hopefully we will have some more posts.",
    Image: MagnifyingGlass,
  },
  [IMG_MSG_NO_MORE_SAVED_POSTS_FOUND]: {
    title: "That's everything!",
    description: "You don't have any more saved posts.",
    Image: MagnifyingGlass,
  },
  [IMG_MSG_NO_MORE_ARCHIVED_POSTS_FOUND]: {
    title: "That's everything!",
    description: "You don't have any more archived posts.",
    Image: MagnifyingGlass,
  },
  [IMG_MSG_NO_POSTS_SAVED]: {
    title: "You don’t have anything saved yet.",
    description:
      "Save articles, videos and stories from any publication, page or app.",
    Image: Telescope,
  },
  [IMG_MSG_NO_POSTS_ARCHIVED]: {
    title: "You don’t have anything archived yet.",
    description:
      "After you finish your saved articles, videos, and stories you can archive them and find them here.",
    Image: Folder,
  },
  [IMG_MSG_ERROR_SAVED_POSTS]: {
    title: "There was an issue retrieving your saved posts.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: PhoneLightning,
  },
  [IMG_MSG_ERROR_ARCHIVED_POSTS]: {
    title: "There was an issue retrieving your archived posts.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: PhoneLightning,
  },
  [IMG_MSG_ERROR_POSTS]: {
    title: "Oh no! Something went wrong.",
    description:
      "Make sure you are connected to the internet or try again later.",
    Image: PhoneLightning,
  },
};

const ImageMessage = ({ type }) => {
  const { title, description, Image } = IMAGE_MESSAGES[type];
  return (
    <div className="flex flex-col items-center py-16">
      {Image}
      <h2 className="mt-4 mb-2 text-xl font-normal text-center tracking-tighter text-gray-700 dark:text-gray-300">
        {title}
      </h2>
      <p className="max-w-sm leading-relaxed text-base text-center text-gray-500 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default ImageMessage;
