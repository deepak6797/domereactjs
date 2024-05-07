import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { getValue } from "../../../utils/object";

interface RoleTableProps {
  data: any[];
  showCheckBox?: boolean;
  showAction?: boolean;
  onEdit: (data: any) => unknown;
  onDelete: (id: string) => unknown;
}

const RoleTable: React.FC<RoleTableProps> = ({
  data,
  onEdit,
  onDelete,
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
            {getValue(item, "name")}
          </td>

          {showAction && (
            <td className="py-4  whitespace-nowrap flex">
            <button
              type="button"
              data-modal-toggle="edit-user-modal "
              className="dark:hover:bg-gray-700 hover:bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onEdit({role: item, id: getValue(item, '_id')});
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
                onDelete(getValue(item, '_id'));
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

export default RoleTable;
