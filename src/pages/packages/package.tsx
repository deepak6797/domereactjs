import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import DeleteModal from "../../components/modal/DeleteModal";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import { useDeletePackage, useGetAllPackages } from "../../hooks/package.hook";
import PackageTable from "../../components/table/packages/PackageTable";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constant/path";

export interface OrderProps {
  name: string;
  email: string;
  _id: string;
}

const userHeader: TableHeader[] = [{ title: "Name" }];

const Package = () => {
  const [visible, setVisible] = useState(false);
  const [packageId, setPackageId] = useState("");

  const navigate = useNavigate();

  const { data: allPackage } = useGetAllPackages();

  const { mutateAsync: deletePackage, isPending: isDeleting } =
    useDeletePackage();

  const onAddBtnClick = () => {
    navigate(PATH.addPackage);
  };

  const onDeleteClick = (id: string) => {
    console.log(id,"id");
    setPackageId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
  };

  const onUserDelete = async () => {
    try {
      await deletePackage({
        id: packageId,
      });
      showSuccessMessage("package deleted successfully !!!");
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  // const onEditClick = (id: string) => {
  //  navigate(`${PATH.updatePackage}/${id}`)
  // };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add package"
        searchPlaceHolder="Search package"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <PackageTable
            data={getValue(allPackage, "results", [])}
            onDelete={onDeleteClick}
            // onEdit={onEditClick}
          />
        }
      />

      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Package"
      />
    </div>
  );
};

export default Package;
