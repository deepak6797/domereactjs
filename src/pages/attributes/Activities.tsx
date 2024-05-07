import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import DeleteModal from "../../components/modal/DeleteModal";
import {
  useDeleteActivities,
  useGetAllActivities,
} from "../../hooks/activities.hook";
import ActivitiesTable from "../../components/table/attributes/ActivitiesTable";
import ActivitiesModal from "../../components/modal/attributes/ActivitiesModal";
import ActivitiesUpdateModal from "../../components/modal/attributes/ActivitiesUpdateModal";

const userHeader: TableHeader[] = [{ title: "Name" }];

const Activities = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateActivitiesName, setUpdateActivitiesName] = useState("");
  const [activitiesId, setActivitiesId] = useState("");
  const { data: activitiesList } = useGetAllActivities();
  const { mutateAsync: deleteActivities, isPending: isDeleting } =
    useDeleteActivities();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    setActivitiesId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      const response = await deleteActivities({
        id: activitiesId,
      });
      showSuccessMessage(getValue(response, "message"));
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (id: string, name: string) => {
    setActivitiesId(id);
    setUpdateModalVisible(true);
    setUpdateActivitiesName(name);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add Activities"
        searchPlaceHolder="Search for tourType"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <ActivitiesTable
            data={getValue(activitiesList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <ActivitiesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add Activities"
        data={getValue(activitiesList, "results", [])}
      />
      <ActivitiesUpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="Update Activities"
        data={getValue(activitiesList, "results", [])}
        id={activitiesId}
        updateValue={updateActivitiesName}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Activities"
      />
    </div>
  );
};

export default Activities;
