import { AiOutlineDelete } from 'react-icons/ai';
import { getValue } from '../../../utils/object';

interface CustomerTableProps {
  data: any[];
  showCheckBox?: boolean;
  showAction?: boolean;
  onDelete: (id: string) => unknown;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
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
          {/* <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
            {getValue(item, 'name')}
          </td> */}

          <td className="max-w-sm p-4  overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
            {getValue(item, 'email')}
          </td>

          {showAction && (
            <td className="p-4  whitespace-nowrap flex">
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

export default CustomerTable;
