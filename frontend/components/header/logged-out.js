import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LoggedOutHeader = () => {
  // const router = useRouter();

  // const checkAuth = () => {
  //   fetch(`/api/check-authentication`, {
  //     withCredentials: true,
  //     credentials: "include",
  //     // credentials: "same-origin",
  //   }).then(({ status }) => {
  //     if (status === 200) {
  //       router.push("/reading-list");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // checkForLoggedIn(router);

  return (
    <header>
      <Popover className="fixed z-50 w-full bg-white border-b dark:bg-gray-700 border-blueGray-200 dark:border-blueGray-800 lg:px-20">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-4 md:justify-start md:space-x-10 lg:px-8">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">Lyra Labs</span>
                  <img
                    className="h-14 w-auto"
                    src="/wordmark-logo-light.svg"
                    alt="Lyra Labs Wordmark"
                  />
                </a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <nav className="flex-col hidden px-5 pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
                <a
                  className="items-center mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-400"
                  href="./index-saas.html"
                >
                  SAAS Version
                </a>
                <a
                  className="items-center mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-400"
                  href="#features"
                >
                  Features
                </a>
                <a
                  className="items-center mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-500"
                  href="#reviews"
                >
                  Reiviews
                </a>
                <a
                  className="items-center mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:ml-4 hover:text-lightBlue-500"
                  href="#faq"
                >
                  Faq
                </a>
              </nav>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          className="h-14 w-auto"
                          src="/wordmark-logo-light.svg"
                          alt="Lyra Labs Wordmark"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 px-5">
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        Get the App
                      </a>
                    </div>
                    <div className="mt-6">
                      <Link href={"/signup"} passHref>
                        <a
                          href="#"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          Sign up
                        </a>
                      </Link>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Already a user?
                        <Link href={"/login"} passHref>
                          <a href="#" className="text-gray-900">
                            {" Sign in"}
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </header>
  );
};

export default LoggedOutHeader;
