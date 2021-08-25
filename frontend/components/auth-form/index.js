import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  MagicAuthContext,
  LoginModalContext,
  CurrentUserContext,
} from "@components/layout";
import router from "next/router";

const AuthForm = ({ isSignup = false }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const { isLoggedIn, signOut, signIn } = useContext(MagicAuthContext);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, name, () => {
      if (isSignup) {
        router.push("/discover");
      } else {
        router.push("/reading-list");
      }
    });
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const title = isSignup ? "Sign up for an account" : "Sign in to your account";
  const navLinkText = isSignup ? "sign in here" : "sign up here";
  const navLinkHref = isSignup ? "/login" : "/signup";
  const ctaText = isSignup ? "Sign up" : "Sign in";

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="px-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            className="mx-auto w-auto"
            src="/lyra-logo.svg"
            alt="Lyra Labs logo"
            width={100}
            height={128}
          />
        </div>
        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2> */}
        {/* <h1 className="mt-6 text-center font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl "> */}
        <h1 className="mt-6 text-center font-serif text-4xl font-bold tracking text-blue-1000 dark:text-gray-300">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link href={navLinkHref} passHref>
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              {navLinkText}
            </a>
          </Link>
        </p>
      </div>

      <div className="mt-8 w-full sm:mx-auto sm:w-full sm:max-w-md">
        {/* <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"> */}
        <div className="px-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method={"POST"}
          >
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleNameChange(e.target.value)}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => handleEmailChange(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              {/* <button
                type="submit"
                class="w-full justify-center text-center inline-flex items-center px-8 py-2 mr-4 text-white transition-all duration-500 ease-in-out transform bg-purple border-2 border-purple hover:text-white md:mb-2 lg:mb-0 rounded-xl hover:border-white hover:bg-purple-dark focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
              >
                {ctaText}
              </button> */}
              <button
                type="submit"
                class="w-full justify-center text-center inline-flex items-center px-8 py-2 mr-4 text-white transition-all duration-500 ease-in-out transform bg-purple border-2 border-purple hover:text-white md:mb-2 lg:mb-0 rounded-xl hover:border-white hover:bg-purple-dark focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
              >
                {ctaText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
