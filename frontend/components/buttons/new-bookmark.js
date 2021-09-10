import React, { useContext } from "react";
import { BookmarkModalContext } from "@components/layout";
import { MailIcon, PlusIcon, PlusSmIcon } from "@heroicons/react/solid";

const NewBookmarkBtn = () => {
  const { setShowBookmarkModal } = useContext(BookmarkModalContext);
  return (
    <button
      type="button"
      className="ml-auto inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-purple hover:bg-purple-dark focus:outline-none"
      onClick={() => setShowBookmarkModal(true)}
    >
      <PlusSmIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
      Bookmark
    </button>
  );
};

export default NewBookmarkBtn;
