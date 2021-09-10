import React, { Fragment, useContext, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CurrentUserContext } from "@components/layout";
import { useRouter } from "next/router";
import { classNames } from "../../shared/utils";
import { REQUEST_BETA_APP_URL } from "@shared/constants/config";
import { MagicAuthContext } from "@components/layout";

import { SelectorIcon } from "@heroicons/react/solid";

const SidebarHeader = () => {
  const { currentUser, refetch } = useContext(CurrentUserContext);
  const { signOut } = useContext(MagicAuthContext);

  useEffect(() => {
    refetch();
  }, []);

  if (!currentUser) {
    return null;
  }

  const { avatar, name, email } = currentUser;
  const router = useRouter();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(() => {
      router.push("/");
    });
  };

  return (
    <Menu
      as="div"
      className="w-full relative inline-block text-left border-b border-gray-200"
    >
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="group w-full px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200">
              <span className="flex w-full justify-between items-center">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  <img
                    className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                    src={avatar}
                    alt=""
                  />
                  <span className="flex-1 flex flex-col min-w-0">
                    <span className="text-gray-900 text-sm font-medium truncate">
                      {name}
                    </span>
                    <span className="text-gray-500 text-sm truncate">
                      {email}
                    </span>
                  </span>
                </span>
                <SelectorIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
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
              className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      target="_blank"
                      href={REQUEST_BETA_APP_URL}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Get mobile app
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={handleSignOut}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default SidebarHeader;
