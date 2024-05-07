import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { getValue } from "../../../utils/object";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";

interface SubscriptionTableProps {
  data: any[];
  showCheckBox?: boolean;
  showAction?: boolean;
  onEditStatus: (isVerified: boolean, id: string) => unknown;
  onDelete: (id: string) => unknown;
  onEdit: (data:any) => unknown;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  data,
  onEdit,
  onDelete,
  onEditStatus,
  showAction = true,
}) => {
  return (
    <>
      {data.map((item) => (
        <tr
          className="hover:bg-slate-100 dark:hover:bg-gray-900  "
          key={item?._id}
        >
          <td className="p-4 overflow-hidden text-sm font-normal text-gray-500 truncate dark:text-gray-400">
            {getValue(item, "name")}
          </td>

          <td className=" p-4 overflow-hidden text-sm font-normal text-gray-500 truncate dark:text-gray-400">
            {getValue(item, "recurring")}
          </td>

          <td className=" p-4 overflow-hidden text-sm font-normal text-gray-500 truncate dark:text-gray-400">
            {getValue(item, "price")}
          </td>

          <td className="max-w-sm p-4 capitalize overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
            {getValue(item, "isActive") ? (
              <BiSolidToggleRight
                className="cursor-pointer text-blue-600"
                size={34}
                onClick={() =>
                  onEditStatus(
                    getValue(item, "isActive"),
                    getValue(item, "_id")
                  )
                }
              />
            ) : (
              <BiSolidToggleLeft
                className="cursor-pointer"
                size={34}
                onClick={() =>
                  onEditStatus(
                    getValue(item, "isActive"),
                    getValue(item, "_id")
                  )
                }
              />
            )}
          </td>

          {showAction && (
            <td className="py-4  whitespace-nowrap flex">
              <button
                type="button"
                data-modal-toggle="edit-user-modal "
                className="dark:hover:bg-gray-700 hover:bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit({subscription: item, id: getValue(item, '_id')});
                }}
              >
                <BiEdit className="text-blue-500" />
              </button>

              <button
                type="button"
                data-modal-toggle="delete-user-modal"
                className="dark:hover:bg-gray-700 hover:bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(getValue(item, "_id"));
                }}
              >
                <AiOutlineDelete className="text-red-600" />
              </button>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};

export default SubscriptionTable;
