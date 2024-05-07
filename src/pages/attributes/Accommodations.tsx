import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import AccommodationTable from "../../components/table/attributes/AccommodationTable";
import AccommodationModal from "../../components/modal/attributes/AccommodationModal";
import AccommodationUpdateModal from "../../components/modal/attributes/AccommodationUpdateModal";
import DeleteModal from "../../components/modal/DeleteModal";
import { useDeleteAccommodation, useGetAllAccommodation } from "../../hooks/accommodation.hook";

const userHeader: TableHeader[] = [{ title: "Name" }];

const Accommodations = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateAccommodationName, setUpdateAccommodationName] = useState("");
  const [accommodationId, setAccommodationId] = useState("");
  const { data: accommodationList } = useGetAllAccommodation();
  const { mutateAsync: deleteAccommodation, isPending: isDeleting } = useDeleteAccommodation();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    setAccommodationId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      const response = await deleteAccommodation({
        id: accommodationId,
      });
      showSuccessMessage(getValue(response, "message"));
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (id: string, name: string) => {
    setAccommodationId(id);
    setUpdateModalVisible(true);
    setUpdateAccommodationName(name);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add Accommodations"
        searchPlaceHolder="Search for accommodations"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <AccommodationTable
            data={getValue(accommodationList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <AccommodationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add Accommodation"
        data={getValue(accommodationList, "results", [])}
      />
      <AccommodationUpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="Update accommodation"
        data={getValue(accommodationList, "results", [])}
        id={accommodationId}
        updateValue={updateAccommodationName}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Accommodations"
      />
    </div>
  );
};

export default Accommodations;
