import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import DeleteModal from "../../components/modal/DeleteModal";
import {
  useDeleteTransport,
  useGetAllTransport,
} from "../../hooks/transport.hook";
import TransportTable from "../../components/table/attributes/TransportTbale";
import TransportModal from "../../components/modal/attributes/TransportModal";
import TransportUpdateModal from "../../components/modal/attributes/TransportUpdateModal";

const userHeader: TableHeader[] = [{ title: "Name" }];

const Transports = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateTransportName, setUpdateTransportName] = useState("");
  const [transportId, setTransportId] = useState("");
  const { data: transportList } = useGetAllTransport();
  const { mutateAsync: deleteTransport, isPending: isDeleting } =
    useDeleteTransport();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    setTransportId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      await deleteTransport({
        id: transportId,
      });
      showSuccessMessage("tourType Deleted Successfully !!!");
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (id: string, name: string) => {
    setTransportId(id);
    setUpdateModalVisible(true);
    setUpdateTransportName(name);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add Transports"
        searchPlaceHolder="Search for transports"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <TransportTable
            data={getValue(transportList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <TransportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add Transports"
        data={getValue(transportList, "results", [])}
      />
      <TransportUpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        setVisible={setUpdateModalVisible}
        title="Update Transports"
        data={getValue(transportList, "results", [])}
        id={transportId}
        updateValue={updateTransportName}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Transports"
      />
    </div>
  );
};

export default Transports;
