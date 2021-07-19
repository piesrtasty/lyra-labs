import Link from "next/link";

import { DeviceMobileIcon, ChatIcon } from "@heroicons/react/outline";

import {
  FEEDBACK_FORM_URL,
  REQUEST_BETA_APP_URL,
} from "@shared/constants/config";

const SidebarFooter = () => {
  return (
    <>
      <Link href={FEEDBACK_FORM_URL} passHref>
        <a
          key={"send-feedback"}
          target="_blank"
          className={
            "group flex items-center px-2 py-2 text-sm font-medium text-purple hover:text-purple-dark"
          }
        >
          <ChatIcon
            className={
              "text-purple  mr-3 flex-shrink-0 h-6 w-6 group-hover:text-purple-dark"
            }
            aria-hidden="true"
          />
          Send feedback
        </a>
      </Link>
      <Link href={REQUEST_BETA_APP_URL} passHref>
        <a
          key={"send-feedback"}
          target="_blank"
          className={
            "group flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }
        >
          <DeviceMobileIcon
            className={
              "text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
            }
            aria-hidden="true"
          />
          Get mobile app
        </a>
      </Link>
      {/* </div> */}
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <img
          className="h-12 w-auto"
          src="/wordmark-logo-light.svg"
          alt="Workflow"
        />
      </div>
    </>
  );
};

export default SidebarFooter;
