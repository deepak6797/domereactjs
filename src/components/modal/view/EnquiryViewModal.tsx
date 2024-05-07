import { IoCloseSharp } from "react-icons/io5";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/clickOutside.hook";
import Transition from "../../../lib/Transition";

export interface Props {
  role: string;
  permission: string;
}

interface EnquiryViewModalProps {
  visible: boolean;
  data?: any;
  onClose: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  id: string;
}

const EnquiryViewModal: React.FC<EnquiryViewModalProps> = ({
  visible,
  onClose,
  setVisible,
  title,
  data,
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
            <div className="flex flex-col p-10">
              <div>
                <span className="text-gray-400">Name</span>: {data?.fullname}
              </div>
              <div>
                <span className="text-gray-400">Phone No.</span>:{" "}
                {data?.contact}
              </div>

              <div>
                <span className="text-gray-400">Departure Date</span>:{" "}
                {data?.departure_date}
              </div>

              <div>
                <span className="text-gray-400">Message</span>: {data?.message}
              </div>

              <div>
                <span className="text-gray-400">Package</span>: {data?.package}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default EnquiryViewModal;
