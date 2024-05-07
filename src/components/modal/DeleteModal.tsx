import { IoCloseSharp } from "react-icons/io5";
import { useRef } from "react";
import Transition from "../../lib/Transition";
import Button from "../button/Button";
import { useClickOutside } from "../../hooks/clickOutside.hook";

interface MenuCategoryModalProps {
  visible: boolean;
  isPending: boolean;
  onClose: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  title: string;
}

const DeleteModal: React.FC<MenuCategoryModalProps> = ({
  visible,
  onClose,
  setVisible,
  handleDelete,
  title,
}) => {
  const modalContent = useRef<HTMLDivElement>(null);

  useClickOutside(modalContent, visible, setVisible);

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={visible}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />

      <Transition
        id={"category"}
        className="fixed inset-0 z-[100] overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={visible}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-xl w-full max-h-full rounded shadow-lg"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-slate-800">
            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
              <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="add-user-modal"
                onClick={onClose}
              >
                <IoCloseSharp className="text-3xl" />
              </button>
            </div>

            <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
              <Button
                title={title}
                styles="bg-indigo-500 hover:bg-indigo-600 w-full"
                onClick={handleDelete}
                // disabled={isPending}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default DeleteModal;
