import { HiOutlinePlusSm } from "react-icons/hi";

interface CommonFilterProps {
  addBtnText?: string;
  searchPlaceHolder: string;
  onAddBtnClick: () => void;
  showButton: boolean;
}

const CommonFilter: React.FC<CommonFilterProps> = ({
  addBtnText,
  searchPlaceHolder,
  onAddBtnClick,
  showButton,
}) => {
  return (
    <div className="sm:flex mb-8">
      <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
        <form className="lg:pr-3" action="#" method="GET">
          <label htmlFor="users-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 lg:w-64 xl:w-96">
            <input
              type="text"
              name="email"
              id="users-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 form-input"
              placeholder={searchPlaceHolder}
            />
          </div>
        </form>
        {/* <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0 items-center">
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <IoMdSettings className="text-2xl" />
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <BsTrashFill className="text-xl" />
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <BsExclamationCircleFill className="text-xl" />
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <BsThreeDotsVertical className="text-2xl" />
          </a>
        </div> */}
      </div>

      {showButton && (
        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
          <button
            type="button"
            data-modal-toggle="add-user-modal"
            className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-black dark:text-gray-300 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700  focus:ring-4 sm:w-auto gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onAddBtnClick();
            }}
          >
            <HiOutlinePlusSm className="text-xl" />
            <span>{addBtnText}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommonFilter;
