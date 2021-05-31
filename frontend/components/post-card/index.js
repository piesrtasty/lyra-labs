import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  BookmarkIcon,
  ArchiveIcon,
  ShareIcon,
  TrashIcon,
  MailIcon,
  ReplyIcon,
  StarIcon,
} from "@heroicons/react/solid";

// import {
//   CodeIcon,
//   DotsVerticalIcon,
//   FlagIcon,
//   BookmarkIcon,
//   ArchiveIcon,
//   ShareIcon,
//   TrashIcon,
//   MailIcon,
//   StarIcon,
// } from "@heroicons/react/solid";

import { classNames, formatDate } from "../../shared/utils";

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

const ACTIONS = {
  [ACTION_SAVE]: {
    icon: BookmarkIcon,
  },
  [ACTION_ARCHIVE]: { icon: ArchiveIcon },
  [ACTION_RESTORE]: { icon: BookmarkIcon },
  [ACTION_SHARE]: { icon: BookmarkIcon },
  [ACTION_REMOVE]: { icon: BookmarkIcon },
};

const PostCard = ({
  post: {
    id,
    image,
    title,
    description,
    archived,
    pinned,
    author,
    url,
    logo,
    publisher,
    date,
  },
  postType = POST_TYPE_SAVED,
}) => {
  const POST_ACTIONS = POST_TYPE_ACTIONS[postType];
  //   console.log("POST_ACTIONS", POST_ACTIONS);
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="bg-white px-4 pt-5 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            {logo && (
              <div
                className={
                  "h-10 w-10 border border-gray-300 bg-white text-gray-300 bg-cover bg-center "
                }
                style={{ backgroundImage: `url(${logo})` }}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {publisher && (
              <p className="text-sm font-medium text-gray-900">
                <a href="#" className="hover:underline">
                  {publisher}
                </a>
              </p>
            )}
            {date && (
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
            )}
          </div>
          <div className="flex-shrink-0 self-center flex">
            <Menu as="div" className="relative z-30 inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <DotsVerticalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "flex px-4 py-2 text-sm"
                              )}
                            >
                              <StarIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Add to favorites</span>
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "flex px-4 py-2 text-sm"
                              )}
                            >
                              <CodeIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Embed</span>
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "flex px-4 py-2 text-sm"
                              )}
                            >
                              <FlagIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Report content</span>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row">
          {image && (
            <div className="sm:hidden flex-shrink-0 bg-indigo-100">
              <div
                className={
                  "h-32 w-auto border border-gray-300 bg-white text-gray-300 bg-cover bg-center"
                }
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          )}
          <div className="flex-grow">
            <h4 className="text-lg font-bold">
              <a href={url} target="_blank" className="hover:underline">
                {title}
              </a>
            </h4>
            {description && <p className="mt-1">{description}</p>}
          </div>
          {image && (
            <div className="hidden sm:block ml-4 flex-shrink-0 bg-indigo-100">
              <div
                className={
                  "h-32 w-32 border border-gray-300 bg-white text-gray-300 bg-cover bg-center"
                }
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Divider */}
      <div className="relative">
        <div
          className="absolute inset-0 flex items-center mx-8"
          aria-hidden="true"
        >
          <div className="w-full border-t border-gray-200" />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        {POST_ACTIONS.map((action, i) => {
          {
            /* ml-3 */
          }
          return (
            <button
              key={i}
              type="button"
              className={classNames(
                i !== 0 ? "ml-3" : "",
                "relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <BookmarkIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Save</span>
            </button>
          );
        })}
      </div>
    </div>
    // <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
    //   <div className="px-4 py-5 sm:p-6">{/* Content goes here */} CONTENT</div>
    //   <div className="px-4 py-4 sm:px-6">
    //     {/* Content goes here */}
    //     FOOTER
    //     {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
    //   </div>
    // </div>
  );
};

export default PostCard;

/* <div className="px-4 py-4 sm:px-6">
FOOTER
</div> */
