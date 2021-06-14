const LoadingPostCard = () => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="bg-white px-4 pt-5 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className={"h-10 w-10 bg-gray-200 rounded animate-pulse"} />
          </div>
          <div className="min-w-0 flex-1 grid grid-cols-10 gap-1">
            <div class="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
            <div class="col-span-7 h-4"></div>
            <div class="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
            <div class="col-span-8 h-4"></div>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:hidden mb-5 flex-shrink-0">
            <div className={"h-32 w-auto rounded bg-gray-200 animate-pulse"} />
          </div>

          <div className="flex-grow grid grid-cols-10 gap-2">
            <div class="col-span-4 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
            <div class="col-span-6 h-4"></div>
            <div class="col-span-6 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
            <div class="col-span-4 h-4"></div>
            <div class="col-span-6 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
            <div class="col-span-4 h-4"></div>
            <div class="col-span-10 h-4" />
          </div>

          <div className="hidden sm:block ml-5 flex-shrink-0">
            <div className={"h-24 w-24 rounded bg-gray-200 animate-pulse"} />
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute inset-0 flex items-center mx-8"
          aria-hidden="true"
        >
          <div className="w-full border-t border-gray-200" />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div
          className={
            "h-8 w-16 mr-4 relative inline-flex rounded bg-gray-200 animate-pulse"
          }
        />
        <div
          className={
            "h-8 w-16 mr-4 relative inline-flex rounded bg-gray-200 animate-pulse"
          }
        />
        <div
          className={
            "h-8 w-16 mr-4 relative inline-flex rounded bg-gray-200 animate-pulse"
          }
        />
      </div>
    </div>
  );
};

export default LoadingPostCard;
