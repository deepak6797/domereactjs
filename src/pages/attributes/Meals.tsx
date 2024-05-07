import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import DeleteModal from "../../components/modal/DeleteModal";
import MealsTable from "../../components/table/attributes/MealsTable";
import MealsModal from "../../components/modal/attributes/MealsModal";
import MealsUpdateModal from "../../components/modal/attributes/MealsUpdateModal";
import { useDeleteMeals, useGetAllMeals } from "../../hooks/meals.hook";

const userHeader: TableHeader[] = [{ title: "Name" }];

const Meals = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateActivitiesName, setUpdateActivitiesName] = useState("");
  const [activitiesId, setActivitiesId] = useState("");
  const { data: mealsList } = useGetAllMeals();
  const { mutateAsync: deleteActivities, isPending: isDeleting } =
    useDeleteMeals();

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
        addBtnText="Add Meals"
        searchPlaceHolder="Search for meals"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <MealsTable
            data={getValue(mealsList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <MealsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add Meals"
        data={getValue(mealsList, "results", [])}
      />
      <MealsUpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="Update Activities"
        data={getValue(mealsList, "results", [])}
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

export default Meals;
