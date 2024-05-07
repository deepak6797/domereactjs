interface BaseTableProps {
  tableHeaders: TableHeader[];
  tableData: JSX.Element;
  showCheckBox?: boolean;
  showAction?: boolean;
}

export interface TableHeader {
  title: string;
}


const BaseTable: React.FC<BaseTableProps> = ({
  tableHeaders,
  tableData,
  showAction = true,
}) => {
  return (
    <div className="overflow-x-auto bg-gray-100 dark:bg-slate-800  shadow-xl">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ">
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead className={` bg-gray-100 dark:bg-[#1b2638]`}>
              <tr>
                {tableHeaders.map((item: TableHeader) => (
                  <th
                    scope="col"
                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-300"
                    key={item.title}
                  >
                    {item.title}
                  </th>
                ))}

                {showAction && (
                  <th
                    scope="col"
                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-300"
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#1e293c] dark:divide-gray-700">
              {tableData}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BaseTable;
