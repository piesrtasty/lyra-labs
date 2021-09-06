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
      <section className="h-screen bg-center body-font bg-patternTop ">
        <div className="container px-8 pt-32 pb-24 mx-auto lg:px-4 ">
          <div className="flex flex-col w-full mb-12 text-left lg:text-center">
            <h2 className="mb-1 text-xs font-semibold tracking-widest uppercase text-gray-500 ">
              A Web 3 Content Protocol
            </h2>
            {/* <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl "> */}
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl ">
              Save content <br className="hidden lg:block" />
              you'll actually read later.
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
                  class="inline-flex items-center px-8 py-2 mr-4 text-white transition-all duration-500 ease-in-out transform bg-purple border-2 border-purple hover:text-white md:mb-2 lg:mb-0 rounded-xl hover:border-white hover:bg-purple-dark focus:ring-2 ring-offset-current ring-offset-2 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
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
        </div>
      </section>

      <section className="text-gray-700 body-font bg-patternBottom">
        <div className="container flex flex-col items-center px-5 py-16 mx-auto lg:px-24 lg:py-24 md:flex-row">
          <div className="mx-auto mb-10 md:mb-0">
            <div className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 sm:-mt-72 md:mt-0 lg:-mt-72">
              <img className="" alt="hero" src="./browser-frame-dark.svg" />
              <img
                className="rounded-b-lg"
                alt="hero"
                src="./browser-mockup.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-b body-font border-gray-300 dark:border-gray-800"
        id="features"
      >
        <div className="container px-5 py-32 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-20 text-left lg:text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl">
              Unlock the value
              <br className="hidden lg:block" /> of your attention and
              interests.
            </h1>
            <p className="mx-auto text-lg leading-snug text-gray-500 dark:text-gray-300 lg:w-1/2">
              Leverage the power of Web 3 to transform how you interact with
              content.{" "}
            </p>
          </div>
          <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
            <div className="flex p-4 lg:w-1/3 ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-black rounded-full bg-gray-200">
                <UserGroupIcon className="h-6 w-6" />
              </div>
              <div className="flex-grow pl-6">
                <div className="flex flex-col md:flex-row lg:flex-col mb-2 items-start md:items-center lg:items-start">
                  <h1 className="font-serif tracking-normal text-2xl font-semibold text-gray-900 dark:text-white ">
                    Community DAO
                  </h1>
                  <span className="mt-2 md:mt-0 ml-0 md:ml-2 lg:ml-0 lg:mt-2 h-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg leading-snug tracking-tight text-gray-500 dark:text-gray-300">
                  Shape the future of the platform through protocol governance
                  by voting with your LYRA tokens.
                </p>
              </div>
            </div>
            <div className="flex p-4 lg:w-1/3 ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-black rounded-full bg-gray-200">
                <CashIcon className="h-6 w-6" />
              </div>
              <div className="flex-grow pl-6">
                <div className="flex flex-col md:flex-row lg:flex-col mb-2 items-start md:items-center lg:items-start">
                  <h1 className="font-serif text-2xl font-semibold text-gray-900 dark:text-white ">
                    Monetization
                  </h1>
                  <span className="mt-2 md:mt-0 ml-0 md:ml-2 lg:ml-0 lg:mt-2 h-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg leading-snug tracking-tight text-gray-500 dark:text-gray-300">
                  Earn rewards and tokens by consuming, sharing, and curating
                  content.
                </p>
              </div>
            </div>
            <div className="flex p-4 lg:w-1/3 ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-black rounded-full bg-gray-200">
                <FireIcon className="h-6 w-6" />
              </div>
              <div className="flex-grow pl-6">
                <h1 className="mb-2 font-serif text-2xl font-semibold text-gray-900 dark:text-white ">
                  Discovery
                </h1>
                <p className="text-lg leading-snug tracking-tight text-gray-500 dark:text-gray-300">
                  See what other cool people are saving and curate someone
                  else's next favorite thing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="body-font">
        <div className="container items-center px-5 py-24 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-6 text-left lg:text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl ">
              Available wherever your content is.
              {/* <br className="hidden lg:block" /> discover, and share content. */}
            </h1>
            <p className="mx-auto text-lg leading-snug text-gray-500 dark:text-gray-300 lg:w-1/2">
              Save articles, videos and stories from any publication, page or
              app.
            </p>
          </div>

          <div className="flex flex-wrap items-center w-full pt-20 mx-auto">
            <div className="lg:w-3/5 md:w-1/2 md:pr-20 md:p-6">
              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full bg-black pointer-events-none"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-black rounded-full bg-gray-200">
                  1
                </div>
                <div className="flex-grow pl-4 lg:pl-10">
                  <h1 className="mb-2 font-serif text-2xl font-semibold text-gray-900 dark:text-white ">
                    Web App
                  </h1>
                  <p className="w-full text-lg leading-snug text-gray-500 dark:text-gray-300 ">
                    Read in your favorite web browser.
                  </p>
                </div>
              </div>
              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full bg-black pointer-events-none"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-black rounded-full bg-gray-200">
                  2
                </div>
                <div className="flex-grow pl-4 lg:pl-10">
                  <h1 className="mb-2 font-serif text-2xl font-semibold text-gray-900 dark:text-white ">
                    Mobile App
                  </h1>
                  <p className="w-full text-lg leading-snug text-gray-500 dark:text-gray-300 ">
                    Save content from the best apps.
                  </p>
                </div>
              </div>
              <div className="relative flex pb-12">
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-black rounded-full bg-gray-200">
                  3
                </div>
                <div className="flex-grow pl-4 lg:pl-10">
                  <div className="flex flex-col mb-2 items-start">
                    <h1 className="mb-2 font-serif text-2xl font-semibold text-gray-900 dark:text-white ">
                      Browser Extension
                    </h1>
                    <span className="ml-0 h-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                      Coming Soon
                    </span>
                  </div>

                  <p className="w-full text-lg leading-snug text-gray-500 dark:text-gray-300 ">
                    Found something great? Save it then and there.
                  </p>
                </div>
              </div>
            </div>
            <img
              className="h-auto p-10 mt-12 rounded-lg lg:w-2/5 md:w-1/2 md:mt-0"
              src="./lyra-labs-app.png"
              alt="step"
            />
          </div>
        </div>
      </section>
      <section
        className="border-t border-b body-font border-gray-300 dark:border-gray-800"
        id="faq"
      >
        <div className="container flex flex-wrap px-5 py-24 mx-auto lg:px-20">
          <div className="flex flex-col w-full mb-12 text-center">
            {/* <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl "> */}
            <h1 className="font-serif text-4xl font-bold tracking-tight text-blue-1000 dark:text-gray-300 md:text-8xl lg:text-6xl ">
              FAQ
            </h1>
            {/* <p className="mx-auto text-lg leading-snug text-gray-500 dark:text-gray-300 lg:w-1/2">
              Learn more about Lyra Labs.
            </p> */}
          </div>
          {/* <div className="mx-auto -my-10 divide-y-2 divide-gray-900 lg:w-1/2"> */}
          <div className="mx-auto -my-10 divide-y-2 divide-gray-900 lg:w-1/2">
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
                  The app is currently available in beta on TestFlight for iOS.
                  If you'd like to help test the app and get early access, sign
                  up{" "}
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
