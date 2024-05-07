import { IoCloseSharp } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import InputForm from "../form/InputForm";
import Transition from "../../lib/Transition";
import Button from "../button/Button";
import { useClickOutside } from "../../hooks/clickOutside.hook";
import { getValue } from "../../utils/object";
import { checkIfEmpty } from "../../utils/validation";
import { showErrorMessage } from "../../utils/toast";
import TextArea from "../form/TextArea";

export interface Subscription {
  name: string;
  recurring: string;
  features: string;
  price: string;
  isActive: boolean;
}

interface SubscriptionModalProps {
  visible: boolean;
  isPending: boolean;
  subscriptionData: any;
  onClose: () => void;
  onSubmit: (data: Subscription) => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  visible,
  isPending,
  subscriptionData: data,
  onClose,
  onSubmit,
  setVisible,
}) => {
  const modalContent = useRef<HTMLDivElement>(null);

  const [subscriptionData, setSubscriptionData] = useState({
    name: "",
    recurring: "",
    features: "",
    price: "",
    isActive: false,
  });

  const [buttonTitle, setButtonTitle] = useState("Add Subscription");

  useClickOutside(modalContent, visible, setVisible);

  useEffect(() => {
    setButtonTitle("Add Subscription");
    setSubscriptionData({
      name: getValue(data, "name"),
      recurring: getValue(data, "recurring"),
      features: getValue(data, "features"),
      price: getValue(data, "price"),
      isActive: getValue(data, "isActive"),
    });

    if (getValue(data, "name", "")) {
      setButtonTitle("Update Subscription");
    }
  }, [data]);

  const verifyField = () => {
    if (checkIfEmpty(subscriptionData.name)) {
      showErrorMessage("Please enter name");
      return false;
    }
    if (checkIfEmpty(subscriptionData.recurring)) {
      showErrorMessage("Please enter recurring");
      return false;
    }

    if (checkIfEmpty(subscriptionData.features)) {
      showErrorMessage("Please enter features");
      return false;
    }

    if (
      subscriptionData.price === undefined ||
      subscriptionData.price === null
    ) {
      showErrorMessage("Please enter price");
      return false;
    }

    return true;
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSubscriptionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddClick = () => {
    if (!verifyField()) return;

    onSubmit({
      name: subscriptionData.name,
      recurring: subscriptionData.recurring,
      features: subscriptionData.features,
      price: getValue(subscriptionData, "price", 0),
      isActive: false,
    });
  };

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
              <h3 className="text-xl font-semibold dark:text-white">
                {buttonTitle}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="add-user-modal"
                onClick={onClose}
              >
                <IoCloseSharp className="text-3xl" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <InputForm
                    label="Name"
                    type="text"
                    name="name"
                    onChange={onInputChange}
                    value={subscriptionData.name}
                    inputStyle="dark:bg-slate-800 rounded-md py-3"
                  />
                </div>

                <div className="col-span-6">
                  <InputForm
                    label="Recurring"
                    type="text"
                    name="recurring"
                    onChange={onInputChange}
                    value={subscriptionData.recurring}
                    inputStyle="dark:bg-slate-800 rounded-md py-3"
                  />
                </div>

                <div className="col-span-6">
                  <TextArea
                    label="Features"
                    name="features"
                    onChange={onInputChange}
                    value={subscriptionData.features}
                    inputStyle="dark:bg-slate-800 rounded-md py-3"
                  />
                </div>

                <div className="col-span-6">
                  <InputForm
                    label="Price"
                    type="text"
                    name="price"
                    onChange={onInputChange}
                    value={subscriptionData.price}
                    inputStyle="dark:bg-slate-800 rounded-md py-3"
                  />
                </div>
              </div>
            </div>
            <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
              <Button
                title={buttonTitle}
                styles="bg-indigo-500 hover:bg-indigo-600 w-full"
                onClick={onAddClick}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default SubscriptionModal;
