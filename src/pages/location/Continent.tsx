import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import {
  useDeleteRoles,
} from "../../hooks/role.hook";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import ContinentModal from "../../components/modal/ContinentModal";
import { useGetAllContinent } from "../../hooks/continent.hook";
import ContinentTable from "../../components/table/location/continent/ContinentTable";
import DeleteModal from "../../components/modal/DeleteModal";

export interface OrderProps {
  name: string;
  email: string;
  _id: string;
}

const userHeader: TableHeader[] = [{ title: "Name" }, { title: "Code" }];

const Continent = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [continentId, setContinentId] = useState("");
  const { data: ContinentList } = useGetAllContinent();
  const { mutateAsync: deleteRoles, isPending: isDeleting } = useDeleteRoles();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };


  const onDeleteClick = (id: string) => {
    setContinentId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      const response = await deleteRoles({
        id: continentId,
      });
      showSuccessMessage(getValue(response, "message"));
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (data: any) => {
    const { id } = data;
    setModalVisible(true);
    setContinentId(id);
  };


  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Choose Continent"
        searchPlaceHolder="Search for continent"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <ContinentTable
            data={getValue(ContinentList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <ContinentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Choose Continent"
        data={getValue(ContinentList, "results", [])}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Roles"
      />
    </div>
  );
};

export default Continent;
