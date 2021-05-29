import { CheckIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";
import { classNames } from "../../shared/utils";

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
];

const SidebarRight = () => {
  return (
    <>
      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1"
      >
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Activity
          </h3>
        </div>
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          {/* Activity Feed */}
          <div className="flow-root">
            <ul className="-mb-8">
              {timeline.map((item, itemIdx) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {itemIdx !== timeline.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            item.type.bgColorClass,
                            "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          )}
                        >
                          <item.type.icon
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {item.content}{" "}
                            <a href="#" className="font-medium text-gray-900">
                              {item.target}
                            </a>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={item.datetime}>{item.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1"
      >
        <div className="flex flex-row pb-5 border-b border-gray-200">
          <h3 className="text-lg inline-flex leading-6 font-medium text-gray-900">
            Wallet
          </h3>
          <span className="inline-flex ml-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Coming soon!
          </span>
        </div>
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          {/* Activity Feed */}
          <div className="flow-root">COOL</div>
        </div>
      </section>
    </>
  );
};

export default SidebarRight;
