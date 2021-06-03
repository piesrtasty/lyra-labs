const LoadingPostCard = () => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="bg-white px-4 pt-5 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div
              className={
                "h-10 w-10 bg-gray-200 rounded-tr rounded-tl animate-pulse"
              }
            />
          </div>
        </div>
      </div>
      <p>OLD BELOW</p>
      {/* <!-- image --> */}
      <div class="h-32 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>

      <div class="p-5">
        {/* <!-- title --> */}
        <div class="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>

        {/* <!-- content --> */}
        <div class="grid grid-cols-4 gap-1">
          <div class="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div class="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div class="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div class="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div class="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div class="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div class="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div class="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPostCard;
