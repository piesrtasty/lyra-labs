import Link from "next/link";
import { useRouter } from "next/router";

import { classNames } from "@shared/utils";

import {
  ROUTE_READING_LIST,
  ROUTE_ARCHIVE,
  ROUTE_DISCOVER,
  LABEL_DISCOVER,
  LABEL_READING_LIST,
  LABEL_ARCHIVE,
} from "@shared/constants/routes";

import { ArchiveIcon, BookOpenIcon, FireIcon } from "@heroicons/react/outline";

const SidebarNav = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const navigation = [
    {
      name: LABEL_READING_LIST,
      path: ROUTE_READING_LIST,
      icon: BookOpenIcon,
      current: currentRoute === ROUTE_READING_LIST,
    },
    {
      name: LABEL_ARCHIVE,
      path: ROUTE_ARCHIVE,
      icon: ArchiveIcon,
      current: currentRoute === ROUTE_ARCHIVE,
    },
    {
      name: LABEL_DISCOVER,
      path: ROUTE_DISCOVER,
      icon: FireIcon,
      current: currentRoute === ROUTE_DISCOVER,
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <nav className="mt-6">
        <div className="space-y-1">
          {navigation.map((item, i) => (
            <Link key={i} href={item.path} passHref>
              <a
                key={item.name}
                className={classNames(
                  item.current
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                  "group flex items-center px-2 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarNav;
