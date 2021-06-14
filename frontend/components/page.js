import React from "react";
import LoggedInHeader from "@components/header/logged-in";
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";

export default function Example({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <LoggedInHeader />
      <div className="py-6">
        <div className="max-w-3xl mx-auto px-6 sm:px-6 lg:max-w-7xl lg:px-8 md:grid md:grid-cols-12 md:gap-8">
          <div className="hidden md:block md:col-span-4 lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-6 divide-y divide-gray-300"
            >
              <SidebarLeft />
            </nav>
          </div>
          <main className="md:col-span-8 lg:col-span-9 xl:col-span-6">
            {children}
          </main>

          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-6 space-y-4">
              <SidebarRight />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
