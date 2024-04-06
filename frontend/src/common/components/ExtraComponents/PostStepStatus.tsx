function PostStepStatus({ step }: { step: Number }) {
  const second = (step as number) >= 2;
  const third = (step as number) >= 3;

  return (
    <div className="">
      <ol className=" flex justify-center  w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li className="flex items-center text-logo-green  ">
          <span className="flex items-center text-white bg-logo-green justify-center w-5 h-5 me-2 md:text-xs text-sm border border-logo-green rounded-full shrink-0 ">
            1
          </span>
          Overview <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className={`flex items-center ${second ? "text-logo-green " : ""}`}>
          <span
            className={` ${
              second ? "bg-logo-green text-white" : ""
            } flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400`}
          >
            2
          </span>
          Description & Pricing
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className={`flex items-center ${third ? "text-logo-green " : ""}`}>
          <span
            className={` ${
              third ? "bg-logo-green text-white" : ""
            } flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400`}
          >
            3
          </span>
          Publish
        </li>
      </ol>
    </div>
  );
}

export default PostStepStatus;
