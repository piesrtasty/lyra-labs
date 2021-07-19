const Heading = ({ title, breakpoint = "mobile" }) => (
  // <div className="pb-5 px-4 sticky top-0 bg-white">
  <div className="sm:hidden py-4 px-6 sticky top-0 flex flex-row justify-between bg-white">
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    <button
      type="button"
      className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Button text
    </button>
  </div>
);

export default Heading;
