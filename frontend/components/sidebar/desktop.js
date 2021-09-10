import Link from "next/link";
import SidebarHeader from "./header";
import SidebarFooter from "./footer";
import SidebarNav from "./nav";

import {
  FEEDBACK_FORM_URL,
  REQUEST_BETA_APP_URL,
} from "@shared/constants/config";

import { ChatIcon, DeviceMobileIcon } from "@heroicons/react/outline";

const SidebarDesktop = ({}) => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-48 lg:w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-50">
          <SidebarHeader />
          <SidebarNav />
          <SidebarFooter />
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
