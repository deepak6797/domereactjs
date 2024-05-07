import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import DeleteModal from "../../components/modal/DeleteModal";
import {
  useDeleteAccommodation,
  useGetAllAccommodation,
} from "../../hooks/accommodation.hook";
import ViewTable from "../../components/table/view/ViewTable";
import BookingViewModal from "../../components/modal/view/BookingViewModal";

const userHeader: TableHeader[] = [{ title: "Name" }];

const Booking = () => {
  const [visible, setVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [accommodationId, setAccommodationId] = useState("");
  const { data: accommodationList } = useGetAllAccommodation();
  const { mutateAsync: deleteAccommodation, isPending: isDeleting } =
    useDeleteAccommodation();

  const onDeleteClick = (id: string) => {
    setAccommodationId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
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

  const onViewClick = (id: string) => {
    setAccommodationId(id);
    setUpdateModalVisible(true);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        searchPlaceHolder="Search for bookings"
        onAddBtnClick={() => {}}
        showButton={false}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <ViewTable
            data={getValue(accommodationList, "results", [])}
            onDelete={onDeleteClick}
            onView={onViewClick}
          />
        }
      />

      <BookingViewModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="View Booking Details"
        data={getValue(accommodationList, "results", [])}
        id={accommodationId}
      />

      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Booking"
      />
    </div>
  );
};

export default Booking;
