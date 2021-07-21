import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { CREATE_POST } from "@data/mutations";
import { useMutation } from "@apollo/client";
import { postFields } from "@data/fragments";
import { ROUTE_READING_LIST } from "@shared/constants/routes";
import { XCircleIcon } from "@heroicons/react/solid";

const BookmarkModal = ({ open, setOpen, onCancel }) => {
  const [givenUrl, setGivenUrl] = useState();
  const [errorMsg, setErrorMsg] = useState();
  // const [open, setOpen] = useState(true);

  const router = useRouter();
  const currentRoute = router.pathname;
  console.log("router", router);

  const cancelButtonRef = useRef(null);

  const isValidURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    update: (cache, { data: { createPost: createdPost } }) => {
      setOpen(false);
      if (currentRoute !== ROUTE_READING_LIST) {
        router.push(ROUTE_READING_LIST, ROUTE_READING_LIST, { shallow: true });
      }
      cache.modify({
        fields: {
          savedPosts(existingSavedPosts = []) {
            const savedPostRef = cache.writeFragment({
              data: createdPost,
              fragment: postFields,
            });
            return [savedPostRef, ...existingSavedPosts];
          },
        },
      });
    },
    optimisticResponse: {
      createPost: {
        id: "optimisticResponse",
        author: null,
        date: null,
        description: "COOL",
        image: "",
        logo: "",
        archived: false,
        pinned: false,
        publisher: "COOOL",
        title:
          "Welcome to the era of the post-shopping mall — The New York Times",
        url: "https://apple.news/AZQPnnxJjTx6QQU8Jhhdg0A",
        __typename: "Post",
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validUrl) {
    } else {
      setErrorMsg("Please enter a valid URL.");
    }
    const validUrl = isValidURL(givenUrl);
    console.log("givenUrl", givenUrl);
    console.log("validUrl", validUrl);
    // if (givenUrl) {
    //   createPost({
    //     variables: {
    //       givenUrl,
    //     },
    //   });
    //   e.target.reset();
    // }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={onCancel}
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full p-4">
              {/* <div className=""> */}
              {errorMsg && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        There were 2 errors with your submission
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              <form className="sm:flex sm:items-center" onSubmit={handleSubmit}>
                <div className="w-full sm:max-w-s">
                  <label htmlFor="url" className="sr-only">
                    Url
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="shadow-sm focus:ring-purple focus:border-purple block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setGivenUrl(e.target.value)}
                    placeholder="https://mybookmark.com"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-purple hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
              </form>
              {/* </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BookmarkModal;
