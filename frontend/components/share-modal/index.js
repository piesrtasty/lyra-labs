import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/solid";
import get from "lodash/get";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

const ShareModal = ({ open, onClose, post }) => {
  //   const [open, setOpen] = useState(true);

  if (!post) return null;

  const title = get(post, "title", null);
  const url = get(post, "url", null);
  const image = get(post, "image", null);
  const description = get(post, "description", null);

  const cancelButtonRef = useRef(null);

  const options = [
    {
      Target: EmailShareButton,
      Icon: EmailIcon,
      name: "Email",
      props: { url, subject: title, body: "body" },
    },
    {
      Target: TwitterShareButton,
      Icon: TwitterIcon,
      name: "Twitter",
      props: { url, title },
    },
    {
      Target: RedditShareButton,
      Icon: RedditIcon,
      name: "Reddit",
      props: { url, title, windowWidth: 660, windowHeight: 460 },
    },
    {
      Target: TelegramShareButton,
      Icon: TelegramIcon,
      name: "Telegram",
      props: { url, title },
    },
    {
      Target: FacebookShareButton,
      Icon: FacebookIcon,
      name: "Facebook",
      props: { url, quote: title },
    },
    {
      Target: LinkedinShareButton,
      Icon: LinkedinIcon,
      name: "Linkedin",
      props: { url },
    },
    {
      Target: PinterestShareButton,
      Icon: PinterestIcon,
      name: "Pinterest",
      props: {
        url,
        media: image,
      },
    },
  ];

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex">
                {image && (
                  <div className="mr-4 flex-shrink-0">
                    <div
                      className={
                        "h-16 w-16 border border-gray-300 bg-white text-gray-300 bg-cover bg-center"
                      }
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <h4 className="text-lg font-bold">{title}</h4>
                  {description && <p className="mt-1">{description}</p>}
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                <li className="col-span-1">
                  <button style={{ width: "100%" }} onClick={handleCopyClick}>
                    <div className="inline-flex w-full items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple">
                      {/* <Icon size={40} round /> */}
                      <div
                        className="bg-gray-200 rounded-full flex items-center justify-center"
                        style={{ height: 40, width: 40 }}
                      >
                        <LinkIcon
                          className="h-6 w-6 text-purple text-lg group-hover:text-purple"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="text-base ml-4">Copy Link</h4>
                    </div>
                  </button>
                </li>
                {options.map(({ Target, Icon, name, props }) => (
                  <li className="col-span-1">
                    <Target {...props} style={{ width: "100%" }}>
                      <div className="inline-flex w-full items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple">
                        <Icon size={40} round />
                        <h4 className="text-base ml-4">{name}</h4>
                      </div>
                    </Target>
                  </li>
                ))}
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShareModal;
