import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import get from "lodash/get";
import LoggedOutHeader from "@components/header/logged-out";
import {
  AnnotationIcon,
  ChatAlt2Icon,
  ChatAltIcon,
  DocumentReportIcon,
  HeartIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
  ReplyIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { checkIfAuthenticated } from "../shared/utils";

const features = [
  {
    name: "Unlimited Inboxes",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: InboxIcon,
  },

  {
    name: "Compose in Markdown",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: PencilAltIcon,
  },
  {
    name: "Team Reporting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: DocumentReportIcon,
  },
  {
    name: "Saved Replies",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ReplyIcon,
  },
  {
    name: "Email Commenting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ChatAltIcon,
  },
  {
    name: "Connect with Customers",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: HeartIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="text-black transition-colors duration-1000 bg-white dark:bg-black">
      {/* <LoggedOutHeader /> */}
      <div className="fixed z-50 w-full bg-white border-b dark:bg-gray-700 border-blueGray-200 dark:border-blueGray-800 lg:px-20">
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="flex flex-row items-center justify-between">
            <img
              className="h-14 w-auto"
              src="/wordmark-logo-light.svg"
              alt="Workfl     ow"
            />
          </div>
          <nav className="flex-col flex-grow hidden px-5 pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
            <a
              className="items-center py-3 mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-400"
              href="#features"
            >
              Features
            </a>

            <a
              className="items-center py-3 mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:ml-4 hover:text-lightBlue-500"
              href="#faq"
            >
              FAQ
            </a>
            <a
              className="items-center py-3 mt-2 text-base font-normal tracking-tight transition duration-500 ease-in-out transform text-blue-1000 dark:text-blueGray-300 lg:mx-8 md:mt-0 md:mr-4 hover:text-lightBlue-500"
              href="#reviews"
            >
              Sign In
            </a>
            <a
              href="#"
              class="inline-flex items-center px-4 py-1 mr-4 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black hover:text-white md:mb-2 lg:mb-0 rounded-xl hover:border-white hover:bg-blueGray-500 focus:ring-2 ring-offset-current ring-offset-2 dark:border-blueGray-300 dark:bg-blueGray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
            >
              Get started
            </a>
          </nav>
        </div>
      </div>
      <section className="h-screen bg-center body-font bg-patternTop ">
        <div className="container px-8 pt-32 pb-24 mx-auto lg:px-4 ">
          <div className="flex flex-col w-full mb-12 text-left lg:text-center">
            <h2 className="mb-1 text-xs font-semibold tracking-widest uppercase text-blueGray-500 ">
              A Web 3 Bookmarking Protocol
            </h2>
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-blueGray-300 md:text-8xl lg:text-6xl ">
              Save content
              <br className="hidden lg:block" />
              you'll actually read later.
            </h1>
            <p className="mx-auto text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 lg:w-1/2">
              Tailwind CSS templates with a wicked design. Professionally
              designed and 100% responsive static templates for startups and
              personal use.{" "}
            </p>
          </div>
          <div className="flex lg:justify-center">
            <div className="flex flex-col mt-4 md:flex-row">
              <div class="flex lg:justify-center">
                <a
                  href="#"
                  class="inline-flex items-center px-8 py-2 mr-4 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black hover:text-white md:mb-2 lg:mb-0 rounded-xl hover:border-white hover:bg-blueGray-500 focus:ring-2 ring-offset-current ring-offset-2 dark:border-blueGray-300 dark:bg-blueGray-300 dark:hover:bg-white dark:hover:text-black dark:text-black"
                >
                  Register{" "}
                </a>
                <a
                  href="#"
                  class="inline-flex items-center px-8 py-2 ml-4 mr-4 text-black transition-all duration-500 ease-in-out transform dark:text-blueGray-300 hover:text-blueGray-700 md:mb-2 lg:mb-0 rounded-xl focus:ring-2 ring-offset-current ring-offset-2"
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
        className="border-t border-b body-font border-blueGray-300 dark:border-blueGray-800"
        id="features"
      >
        <div className="container px-5 py-32 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-20 text-left lg:text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-blueGray-300 md:text-8xl lg:text-6xl">
              Features that allows you
              <br className="hidden lg:block" />
              to reach your needs faster.
            </h1>
            <p className="mx-auto text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 lg:w-1/2">
              Tailwind CSS templates with a wicked design.{" "}
            </p>
          </div>
          <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
            <div className="flex p-4 lg:w-1/3 ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-black rounded-full bg-blueGray-200">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow pl-6">
                <h1 className="mb-2 font-serif text-2xl font-semibold text-blueGray-900 dark:text-white ">
                  Work Timer
                </h1>
                <p className="text-lg leading-snug tracking-tight text-blueGray-500 dark:text-blueGray-300">
                  Do more meaningful work by dividing your time into intervals
                  and by taking regular breaks to get more work or studying
                  done. .
                </p>
              </div>
            </div>
            <div className="flex p-4 lg:w-1/3 ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-black rounded-full bg-blueGray-200">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                </svg>
              </div>
              <div className="flex-grow pl-6">
                <h1 className="mb-2 font-serif text-2xl font-semibold text-blueGray-900 dark:text-white ">
                  Website Blocker
                </h1>
                <p className="text-lg leading-snug tracking-tight text-blueGray-500 dark:text-blueGray-300">
                  Block Websites that distract and make you unproductive. Adding
                  sites to the block list will block sites when the work timer
                  is on.
                </p>
              </div>
            </div>
            <div className="flex p-4 lg:w-1/3 ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-black rounded-full bg-blueGray-200">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow pl-6">
                <h1 className="mb-2 font-serif text-2xl font-semibold text-blueGray-900 dark:text-white ">
                  Gamification
                </h1>
                <p className="text-lg leading-snug tracking-tight text-blueGray-500 dark:text-blueGray-300">
                  App introduces a point-based reward system to make work a bit
                  more fun and also remind you every action has a price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="body-font">
        <div className="container items-center px-5 py-24 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-6 text-left lg:text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-blueGray-300 md:text-8xl lg:text-6xl ">
              Designed to make you
              <br className="hidden lg:block" />
              look great in every screen.
            </h1>
            <p className="mx-auto text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 lg:w-1/2">
              Tailwind CSS templates with a wicked design.{" "}
            </p>
          </div>
          <div className="flex flex-wrap items-center w-full pt-20 mx-auto">
            <div className="lg:w-3/5 md:w-1/2 md:pr-20 md:p-6">
              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full bg-black pointer-events-none"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-black rounded-full bg-blueGray-200">
                  1
                </div>
                <div className="flex-grow pl-4 lg:pl-10">
                  <h1 className="mb-2 font-serif text-2xl font-semibold text-blueGray-900 dark:text-white ">
                    Auto Block
                  </h1>
                  <p className="w-full text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 ">
                    Automatically block websites based on the amount of time you
                    spend on them.
                  </p>
                </div>
              </div>
              <div className="relative flex pb-12">
                <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                  <div className="w-1 h-full bg-black pointer-events-none"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-black rounded-full bg-blueGray-200">
                  2
                </div>
                <div className="flex-grow pl-4 lg:pl-10">
                  <h1 className="mb-2 font-serif text-2xl font-semibold text-blueGray-900 dark:text-white ">
                    Insights
                  </h1>
                  <p className="w-full text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 ">
                    Learn about how you spend your time on websites
                  </p>
                </div>
              </div>
              <div className="relative flex pb-12">
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-black rounded-full bg-blueGray-200">
                  3
                </div>
                <div className="flex-grow pl-4 lg:pl-10">
                  <h1 className="mb-2 font-serif text-2xl font-semibold text-blueGray-900 dark:text-white ">
                    Hard Mode
                  </h1>
                  <p className="w-full text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 ">
                    Take the challenge up a notch with Hard Mode
                  </p>
                </div>
              </div>
            </div>
            <img
              className="h-auto p-20 mt-12 rounded-lg lg:w-2/5 md:w-1/2 md:mt-0"
              src="./MockupBlack.png"
              alt="step"
            />
          </div>
        </div>
      </section>
      <section
        className="border-t border-b body-font border-blueGray-300 dark:border-blueGray-800"
        id="faq"
      >
        <div className="container flex flex-wrap px-5 py-24 mx-auto lg:px-20">
          <div className="flex flex-col w-full mb-12 text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-blueGray-300 md:text-8xl lg:text-6xl ">
              FAQ
            </h1>
            <p className="mx-auto text-lg leading-snug text-blueGray-500 dark:text-blueGray-300 lg:w-1/2">
              The solution to your anserws.{" "}
            </p>
          </div>
          <div className="mx-auto -my-10 divide-y-2 divide-blueGray-900 lg:w-1/2">
            <div className="flex flex-wrap py-8 md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="mb-3 text-2xl font-normal tracking-tighter text-blueGray-700 dark:text-blueGray-300">
                  <p className="leading-relaxed ext-base text-blueGray-600 dark:text-blueGray-300">
                    By now, you've signed up, paid your first bill, and received
                    your welcome kit (yay!). If you read your welcome booklet,
                    you know there are tons of perks to being a member. You'll
                    want to take a few extra steps, if you haven't already, to
                    take advantage of them. You've got powerful tools, free
                    services, and rewards waiting for you. Let's get you set up.
                  </p>
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap py-8 md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="mb-3 text-2xl font-normal tracking-tighter text-blueGray-700 dark:text-blueGray-300">
                  1. Activate your account
                </h2>
                <p className="mb-4 leading-relaxed ext-base text-blueGray-500 dark:text-blueGray-300">
                  With an account you can easily talk to doctors for $0, get
                  prescription refills, find in-network care, pay your bill,
                  message with your dedicated Care Team, view your digital ID
                  card, and more! Click here to activate your account.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap py-8 md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="mb-3 text-2xl font-normal tracking-tighter text-blueGray-700 dark:text-blueGray-300">
                  2. Download the app
                </h2>
                <p className="leading-relaxed ext-base text-blueGray-500 dark:text-blueGray-300">
                  The App for iPhone and Android has everything you need to
                  manage your health this year. Want to talk to a doctor at 3am?
                  Just request a call through Virtual Urgent Care in the app and
                  you'll be on the phone with a doctor or provider, in as little
                  as 15 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-blueGray-600 body-font">
        <div className="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row lg:px-24">
          <a
            href="https://www.wickedtemplates.com/"
            className="flex items-center justify-center font-medium text-blueGray-900 title-font md:justify-start "
          >
            {/* {{> logo }} */}
            Logo Here
          </a>
          <p className="mt-4 text-sm text-blueGray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-blueGray-200 sm:py-2 sm:mt-0">
            © 2020
            <a
              href="https://twitter.com/wickedtemplates"
              className="ml-1 text-blueGray-600 hover:text-blue-500"
              rel="noopener noreferrer"
              target="_blank"
            >
              @wickedtemplates
            </a>
          </p>
          <span className="inline-flex items-center justify-start gap-2 mt-4 lg:mt-0">
            <p className="mt-4 text-sm text-blueGray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 hover:text-blue-500">
              <a
                href="https://www.wickedtemplates.com/templates.html"
                rel="noopener noreferrer"
              >
                Templates
              </a>
            </p>
            <p className="mt-4 text-sm text-blueGray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 hover:text-blue-500">
              <a
                href="https://www.wickedtemplates.com/demos.html"
                rel="noopener noreferrer"
              >
                Freebies
              </a>
            </p>
            <p className="mt-4 text-sm text-blueGray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 hover:text-blue-500">
              <a
                href="https://www.wickedtemplates.com/pricing.html"
                rel="noopener noreferrer"
              >
                Pricing
              </a>
            </p>
          </span>
          <span className="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start">
            <a className="text-blueGray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-blueGray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-blueGray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-blueGray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // const cookie = get(ctx, "req.headers.cookie", null);
  // if (cookie) {
  //   const isAuthenticated = await checkIfAuthenticated(cookie);
  //   if (isAuthenticated) {
  //     return {
  //       redirect: {
  //         destination: "/reading-list",
  //         permanent: false,
  //       },
  //     };
  //   }
  // } else {
  //   return {
  //     props: {},
  //   };
  // }
  return {
    props: {},
  };
}
