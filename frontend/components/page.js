import React, { Fragment } from "react";
import { Menu, Disclosure, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { PlusIcon, SearchIcon } from "@heroicons/react/solid";

const user = {
  name: "Chelsea Hagon",
  handle: "chelseahagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageId: "1550525811-e5869dd03032",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div>header here</div>
      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-6 divide-y divide-gray-300"
            >
              {/* Your content */}
              lion
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            {/* Your content */}
            tiger
          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-6 space-y-4">
              {/* Your content */}
              bear
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
