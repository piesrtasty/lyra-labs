import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import LoggedInHeader from "@components/header/logged-in";
import SidebarRight from "./sidebar-right";
import SidebarDesktop from "./sidebar/desktop";
import SidebarMobile from "./sidebar/mobile";
import NewBookmarkBtn from "./buttons/new-bookmark";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { classNames } from "../shared/utils";
import { ROUTE_LABELS } from "@shared/constants/routes";

import {
  FEEDBACK_FORM_URL,
  REQUEST_BETA_APP_URL,
} from "@shared/constants/config";

import { MenuIcon } from "@heroicons/react/outline";

const Page = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  const label = ROUTE_LABELS[currentRoute];

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <SidebarMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <SidebarDesktop />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pr-1 pt-1 sm:pl-3 sm:pr-3 sm:pt-3 flex flex-row items-center">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{label}</h1>
          <NewBookmarkBtn />
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {/* <div className="py-6"> */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
            {children}
          </div>
          {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default Page;

// export default function Example({ children }) {
//   return (
//     // <div className="min-h-screen bg-gray-100">
//     <div className="min-h-screen bg-gray-100">
//       <LoggedInHeader />
//       <div className="py-6">
//         <div className="max-w-3xl mx-auto px-6 sm:px-6 lg:max-w-7xl lg:px-8 md:grid md:grid-cols-12 md:gap-8">
//           <div className="hidden md:block md:col-span-4 lg:col-span-3 xl:col-span-2">
//             <nav
//               aria-label="Sidebar"
//               className="sticky top-6 divide-y divide-gray-300"
//             >
//               <SidebarLeft />
//             </nav>
//           </div>
//           <main className="md:col-span-8 lg:col-span-9 xl:col-span-6">
//             {children}
//           </main>

//           <aside className="hidden xl:block xl:col-span-4">
//             <div className="sticky top-6 space-y-4">
//               <SidebarRight />
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }
