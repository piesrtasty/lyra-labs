import { REQUEST_BETA_APP_URL } from "@shared/constants/config";
import get from "lodash/get";
import { checkIfAuthenticated } from "../shared/utils";
import { UserGroupIcon, FireIcon, CashIcon } from "@heroicons/react/outline";

export default function Index() {
  return (
    <div className="text-black transition-colors duration-1000 bg-white dark:bg-black">
      <div className="fixed z-50 w-full bg-white border-b dark:bg-gray-700 border-gray-200 dark:border-gray-800 lg:px-20">
        <div className="flex flex-row max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between">
            <a href="/">
              <img
                className="h-14 w-auto"
                src="/wordmark-logo-light.svg"
                alt="Workflow"
              />
            </a>
          </div>
          {/* <nav className="flex-row items-center flex-grow hidden px-5 pb-4 md:pb-0 md:flex md:justify-end md:flex-row"> */}
          {/* <a
            href="#"
            className="inline-flex md:hidden items-center px-4 py-2 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black hover:text-white lg:mb-0 md:ml-4 rounded-xl hover:border-white hover:bg-gray-500 focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
          >
            Get started
          </a> */}
          {/* <nav className="flex-row items-center flex-grow hidden px-5 pb-4 md:pb-0 md:flex md:justify-end md:flex-row"> */}
          <nav className="flex-row items-center flex-grow px-5 pb-0 flex justify-end flex-row">
            <a
              className="items-center hidden md:flex py-3 hover:underline text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-gray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-400"
              href="#features"
            >
              Features
            </a>

            <a
              className="items-center hidden md:flex hover:underline py-3 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-gray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-400"
              href="#faq"
            >
              FAQ
            </a>

            <a
              className="items-center hidden md:flex hover:underline py-3 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-gray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-500"
              href="/login"
            >
              Sign In
            </a>

            <a
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black hover:text-white lg:mb-0 md:ml-4 rounded-xl hover:border-white hover:bg-gray-500 focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
            >
              Get started
            </a>
          </nav>
        </div>
      </div>

      <section className="h-screen bg-center body-font ">
        <div className="container px-8 pt-32 pb-24 mx-auto lg:px-4 ">
          <div className="flex flex-col w-full mb-12 text-left lg:text-center">
            <h2 className="mb-1 text-xs font-semibold tracking-widest uppercase text-gray-500 ">
              A Web 3 Content Protocol
            </h2>
            {/* <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl "> */}
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-blue-1000 dark:text-gray-300 ">
              {/* <h1 className="mb-6 font-serif text-2xl font-bold tracking-tight text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl "> */}
              Substack for Bookmarks <br className="hidden lg:block" />+ crypto
            </h1>
            <p className="mx-auto text-lg leading-snug text-gray-500 dark:text-gray-300 lg:w-1/2">
              Through a decentralized, user-owned content protocol, Lyra Labs
              lets users monetize their interests, and revolutionizes the way we
              consume, discover, and share content.
            </p>
          </div>
          <div className="flex lg:justify-center">
            <div className="flex flex-col mt-4 md:flex-row">
              <div class="flex lg:justify-center">
                <a
                  href="/signup"
                  class="inline-flex items-center px-8 py-2 mr-4 text-white transition-all duration-500 ease-in-out transform bg-purple border-2 border-purple hover:text-white lg:mb-0 rounded-xl hover:border-white hover:bg-purple-dark focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
                >
                  Register{" "}
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center px-4 py-2 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black hover:text-white lg:mb-0 md:ml-4 rounded-xl hover:border-white hover:bg-gray-500 focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="container flex flex-wrap px-5 py-24 mx-auto lg:px-20">
            {/* <div className="mx-auto -my-10 divide-y-2 divide-gray-900 lg:w-1/2"> */}
            <div className="mx-auto -my-10 divide-y-2 divide-gray-300 lg:w-1/2">
              {/* <div className="flex flex-wrap py-8 md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="mb-3 text-2xl font-normal tracking-tighter text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed ext-base text-gray-600 dark:text-gray-300">
                    Thanks for stopping by. We're 
                  </p>
                </h2>
              </div>
            </div> */}
              <div className="flex flex-wrap py-8 md:flex-nowrap">
                <div className="md:flex-grow">
                  <h2 className="mb-3 text-2xl font-normal tracking-tighter text-gray-700 dark:text-gray-300">
                    1.&nbsp;Where can I learn more?
                  </h2>
                  <p className="mb-4 leading-relaxed ext-base text-gray-500 dark:text-gray-300">
                    You can connect with other community members and those
                    building the project in our{" "}
                    <a
                      className="text-purple hover:underline"
                      target="_blank"
                      href={"https://discord.gg/TcsNDFM3"}
                    >
                      Discord
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap py-8 md:flex-nowrap">
                <div className="md:flex-grow">
                  <h2 className="mb-3 text-2xl font-normal tracking-tighter text-gray-700 dark:text-gray-300">
                    2.&nbsp;How can I get the app?
                  </h2>
                  <p className="leading-relaxed text-base text-gray-500 dark:text-gray-300">
                    The app is currently available in beta on TestFlight for
                    iOS. If you'd like to help test the app and get early
                    access, sign up{" "}
                    <a
                      className="text-purple hover:underline"
                      target="_blank"
                      href={REQUEST_BETA_APP_URL}
                    >
                      here
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = get(ctx, "req.headers.cookie", null);
  if (cookie) {
    const isAuthenticated = await checkIfAuthenticated(cookie);
    if (isAuthenticated) {
      return {
        redirect: {
          destination: "/reading-list",
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } else {
    return {
      props: {},
    };
  }
}
