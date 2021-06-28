import React, { useContext } from "react";
import { Menu, Disclosure, Transition } from "@headlessui/react";
import { CurrentUserContext } from "@components/layout";
import { useRouter } from "next/router";
import { classNames } from "../../shared/utils";
import Link from "next/link";
import {
  ROUTE_READING_LIST,
  ROUTE_ARCHIVE,
} from "../../shared/constants/routes";

import { BookmarkIcon, ArchiveIcon } from "@heroicons/react/outline";

const SidebarLeft = () => {
  const { currentUser, refetch } = useContext(CurrentUserContext);
  const { avatar, name, email } = currentUser;
  console.log("currentUser", currentUser);

  const router = useRouter();
  const currentRoute = router.pathname;

  const navigation = [
    {
      name: "Reading List",
      path: ROUTE_READING_LIST,
      icon: BookmarkIcon,
      current: currentRoute === ROUTE_READING_LIST,
    },
    {
      name: "Archive",
      path: ROUTE_ARCHIVE,
      icon: ArchiveIcon,
      current: currentRoute === ROUTE_ARCHIVE,
    },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 group w-full px-3.5 py-2 text-sm text-left font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
        <span className="flex w-full justify-between items-center">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            <img
              className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"
              src={avatar}
              alt=""
            />
            <span className="flex-1 flex flex-col min-w-0">
              <span className="text-gray-900 text-sm font-medium truncate">
                {name}
              </span>
              <span className="text-gray-500 text-sm truncate">{email}</span>
            </span>
          </span>
        </span>
      </div>
      <nav className="mt-6">
        <div className="space-y-1">
          {navigation.map((item, i) => (
            <Link key={i} href={item.path} passHref>
              <a
                key={item.name}
                className={classNames(
                  item.current
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                  "group flex items-center px-2 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarLeft;
