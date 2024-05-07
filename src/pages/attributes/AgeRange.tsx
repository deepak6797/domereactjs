import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import AgeRangeTable from "../../components/table/attributes/AgeRangeTable";
import AgeRangeModal from "../../components/modal/attributes/AgeRangeModal";
import AgeRangeUpdateModal from "../../components/modal/attributes/AgeRangeUpdateModal";
import DeleteModal from "../../components/modal/DeleteModal";
import { useDeleteAgeRange, useGetAllAgeRange } from "../../hooks/agerange.hook";

const userHeader: TableHeader[] = [{ title: "Name" }];

const AgeRange = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateAgeRangeName, setUpdateAgeRangeName] = useState("");
  const [ageRangeId, setAgeRangeId] = useState("");
  const { data: ageGroupList } = useGetAllAgeRange();
  const { mutateAsync: deleteAgeRange, isPending: isDeleting } = useDeleteAgeRange();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    setAgeRangeId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      const response = await deleteAgeRange({
        id: ageRangeId,
      });
      showSuccessMessage(getValue(response, "message"));
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (id: string, name: string) => {
    setAgeRangeId(id);
    setUpdateModalVisible(true);
    setUpdateAgeRangeName(name);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add AgeRange"
        searchPlaceHolder="Search for ageRange"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <AgeRangeTable
            data={getValue(ageGroupList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <AgeRangeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add AgeRange"
        data={getValue(ageGroupList, "results", [])}
      />
      <AgeRangeUpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="Update AgeRange"
        data={getValue(ageGroupList, "results", [])}
        id={ageRangeId}
        updateValue={updateAgeRangeName}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete AgeRange"
      />
    </div>
  );
};

export default AgeRange;
