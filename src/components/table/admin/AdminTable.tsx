import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import { getValue } from "../../../utils/object";

interface AdminTableProps {
  data: any[];
  showCheckBox?: boolean;
  showAction?: boolean;
  onEdit: (isVerified: boolean, is: string) => unknown;
  onDelete: (id: string) => unknown;
}

const AdminTable: React.FC<AdminTableProps> = ({
  data,
  onEdit,
  onDelete,
  showAction = true,
}) => {
 
  return (
    <>
      {data.map((item) => (
        <tr
          className="hover:bg-slate-100 dark:hover:bg-gray-900 w-full"
          key={item?._id}
        >
          <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
            {getValue(item, "fullName")}
          </td>

          <td className="max-w-sm p-4  overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
            {getValue(item, "email")}
          </td>

          <td className="max-w-sm p-4 capitalize overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
            {getValue(item, "isVerified") ? (
              <BiSolidToggleRight
                className="cursor-pointer text-blue-600"
                size={34}
                onClick={() =>
                  onEdit(getValue(item, "isVerified"), getValue(item, "_id"))
                }
              />
            ) : (
              <BiSolidToggleLeft
                className="cursor-pointer"
                size={34}
                onClick={() =>
                  onEdit(getValue(item, "isVerified"), getValue(item, "_id"))
                }
              />
            )}
          </td>

          {showAction && (
            <td className="p-4  whitespace-nowrap flex">
              <button
                type="button"
                data-modal-toggle="delete-user-modal"
                className="dark:hover:bg-gray-700 hover:bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(getValue(item, "_id"));
                }}
              >
                <AiOutlineDelete className="" />
              </button>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};

export default AdminTable;
