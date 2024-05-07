import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import TourTypeTable from "../../components/table/attributes/TourTypeTable";
import TourTypeModal from "../../components/modal/attributes/TourTypeModal";
import TourTypeUpdateModal from "../../components/modal/attributes/TourTypeUpdateModal";
import {
  useDeleteTourType,
  useGetAllTourType,
} from "../../hooks/tourtype.hook";
import DeleteModal from "../../components/modal/DeleteModal";

const userHeader: TableHeader[] = [{ title: "Name" }];

const TourTypes = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateTourTypeName, setUpdateTourTypeName] = useState("");
  const [tourTypeId, setTourTypeId] = useState("");
  const { data: tourTypeList } = useGetAllTourType();
  const { mutateAsync: deleteTourType, isPending: isDeleting } =
    useDeleteTourType();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    setTourTypeId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      await deleteTourType({
        id: tourTypeId,
      });
      showSuccessMessage("tourType Deleted Successfully !!!");
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (id: string, name: string) => {
    setTourTypeId(id);
    setUpdateModalVisible(true);
    setUpdateTourTypeName(name);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add TourTypes"
        searchPlaceHolder="Search for tourType"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <TourTypeTable
            data={getValue(tourTypeList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <TourTypeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add TourType"
        data={getValue(tourTypeList, "results", [])}
      />
      <TourTypeUpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="Update TourType"
        data={getValue(tourTypeList, "results", [])}
        id={tourTypeId}
        updateValue={updateTourTypeName}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete TourTypes"
      />
    </div>
  );
};

export default TourTypes;
