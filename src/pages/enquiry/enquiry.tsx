import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import DeleteModal from "../../components/modal/DeleteModal";
import ViewTable from "../../components/table/view/ViewTable";
import {
  useDeleteEnquiry,
  useGetAllEnquiry,
  useGetSingleEnquiryDetails,
} from "../../hooks/package.hook";
import EnquiryViewModal from "../../components/modal/view/EnquiryViewModal";

const userHeader: TableHeader[] = [{ title: "Name" }];

const Booking = () => {
  const [visible, setVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const { data: enquiryList } = useGetAllEnquiry();
  const { data: singleEnquiryDetails } = useGetSingleEnquiryDetails(
    enquiryId ? enquiryId : ""
  );
  const { mutateAsync: deleteEnquiry, isPending: isDeleting } =
    useDeleteEnquiry();

  const onDeleteClick = (id: string) => {
    setEnquiryId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
  };

  const onUserDelete = async () => {
    try {
      const response = await deleteEnquiry({
        id: enquiryId,
      });
      showSuccessMessage(getValue(response, "message"));
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onViewClick = (id: string) => {
    setEnquiryId(id);
    setUpdateModalVisible(true);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        searchPlaceHolder="Search for enquiry"
        onAddBtnClick={() => {}}
        showButton={false}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <ViewTable
            data={getValue(enquiryList, "results", [])}
            onDelete={onDeleteClick}
            onView={onViewClick}
          />
        }
      />

      <EnquiryViewModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="View Enquiry Details"
        data={singleEnquiryDetails}
        id={enquiryId}
      />

      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Enquiry"
      />
    </div>
  );
};

export default Booking;
