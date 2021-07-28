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
    name: "Manage Team Members",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: UsersIcon,
  },
  {
    name: "Spam Report",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: TrashIcon,
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
const metrics = [
  {
    id: 1,
    stat: "8K+",
    emphasis: "Companies",
    rest: "use laoreet amet lacus nibh integer quis.",
  },
  {
    id: 2,
    stat: "25K+",
    emphasis: "Countries around the globe",
    rest: "lacus nibh integer quis.",
  },
  {
    id: 3,
    stat: "98%",
    emphasis: "Customer satisfaction",
    rest: "laoreet amet lacus nibh integer quis.",
  },
  {
    id: 4,
    stat: "12M+",
    emphasis: "Issues resolved",
    rest: "lacus nibh integer quis.",
  },
];
const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="text-black transition-colors duration-1000 bg-white dark:bg-black">
      <section className="h-screen bg-center body-font bg-patternTop ">
        <div className="container px-8 pt-32 pb-24 mx-auto lg:px-4 ">
          <div className="flex flex-col w-full mb-12 text-left lg:text-center">
            <h2 className="mb-1 text-xs font-semibold tracking-widest uppercase text-blueGray-500 ">
              a great header right here
            </h2>
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-blue-1000 dark:text-blueGray-300 md:text-8xl lg:text-6xl ">
              A Long headline
              <br className="hidden lg:block" />
              to convey your users.
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
              {/* <button className="inline-flex items-center px-5 py-3 mt-2 text-white transition-all duration-500 ease-in-out transform bg-black border border-gray-900 rounded-lg focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-900 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                </svg>
                <span className="flex flex-col items-start ml-4 leading-none">
                  <span className="mb-1 text-xs text-blueGray-400">
                    GET IT ON
                  </span>
                  <span className="font-medium text-white title-font">
                    Google Play
                  </span>
                </span>
              </button> */}
              {/* <button className="inline-flex items-center px-5 py-3 mt-2 text-white transition-all duration-500 ease-in-out transform bg-black border border-gray-900 rounded-lg md:ml-4 focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-900 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 305 305"
                >
                  <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                  <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                </svg>
                <span className="flex flex-col items-start ml-4 leading-none">
                  <span className="mb-1 text-xs text-blueGray-400">
                    Download on the
                  </span>
                  <span className="font-medium text-white title-font">
                    App Store
                  </span>
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font bg-patternBottom">
        <div className="container flex flex-col items-center px-5 py-16 mx-auto lg:px-24 lg:py-24 md:flex-row">
          <div className="mx-auto mb-10 md:mb-0">
            <img
              className="object-cover object-center mx-auto rounded md:mt-44 lg:-mt-44"
              alt="hero"
              src="./Mockup.png"
            />
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
