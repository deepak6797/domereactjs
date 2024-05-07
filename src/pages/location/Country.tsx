import { useState } from "react";
import CommonFilter from "../../components/filter/CommonFilter";
import BaseTable, { TableHeader } from "../../components/table/BaseTable";
import { getValue } from "../../utils/object";
import { showSuccessMessage } from "../../utils/toast";
import {  useDeleteCountry, useGetAllCountry } from "../../hooks/country.hook";
import CountryTable from "../../components/table/location/country/CountryTable";
import CountryModal from "../../components/modal/CountryModal";
import DeleteModal from "../../components/modal/DeleteModal";

export interface OrderProps {
  name: string;
  email: string;
  _id: string;
}

const userHeader: TableHeader[] = [
  { title: "Country" },
  { title: "Continent" },
];

const Country = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryId, setCountryId] = useState("");
  const { data: CountryList } = useGetAllCountry();
  const { mutateAsync: deleteCountry, isPending: isDeleting } = useDeleteCountry();

  const onAddBtnClick = () => {
    setModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    setCountryId(id);
    setVisible(true);
  };

  const onCloseClick = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const onUserDelete = async () => {
    try {
      await deleteCountry({
        id: countryId,
      });
      showSuccessMessage("Country Deleted Successfully !!!");
      setVisible(false);
    } catch (error) {
      showSuccessMessage(getValue(error, "message"));
    }
  };

  const onEditClick = (data: any) => {
    const { id } = data;
    setModalVisible(true);
    setCountryId(id);
  };

  return (
    <div className="mt-14">
      <CommonFilter
        addBtnText="Add Country"
        searchPlaceHolder="Search for country"
        onAddBtnClick={onAddBtnClick}
        showButton={true}
      />
      <BaseTable
        tableHeaders={userHeader}
        tableData={
          <CountryTable
            data={getValue(CountryList, "results", [])}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        }
      />
      <CountryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        title="Add Country"
        data={getValue(CountryList, "results", [])}
      />
      <DeleteModal
        visible={visible}
        onClose={onCloseClick}
        setVisible={setVisible}
        isPending={isDeleting}
        handleDelete={onUserDelete}
        title="Delete Country"
      />
    </div>
  );
};

export default Country;
