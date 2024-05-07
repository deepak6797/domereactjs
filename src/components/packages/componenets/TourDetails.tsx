import {  useMemo } from "react";
import { useGetAllCountry } from "../../../hooks/country.hook";
import UploadImage from "../../form/UploadImage";
import CustomInput from "../../form/custom/CustomInput";
import CustomTextArea from "../../form/custom/CustomTextArea";
import EndDate from "../../form/datepicker/EndDate";
import StartDate from "../../form/datepicker/StartDate";
import { getValue } from "../../../utils/object";
import CustomSelect from "../../form/custom/CustomInputSelect";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";

interface Props {
  selectedImage: any;
  setSelectedImage: (val: any) => void;
  packageDetails?: any;
  isTopDestination?: boolean;
  handleClickOpenClose: () => void;
}

const TourDetails: React.FC<Props> = ({
  selectedImage,
  setSelectedImage,
  packageDetails,
  isTopDestination,
  handleClickOpenClose
}) => {
  const { data: allCountries } = useGetAllCountry();

  const countriesList = useMemo(() => {
    if (allCountries && allCountries.results) {
      return getValue(allCountries, "results", []).map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
    }
  }, [allCountries]);

 
  console.log(isTopDestination, "is top");

  

  return (
    <>
      <div className="flex flex-col  gap-3 my-5  shadow bg-white rounded  dark:bg-[#182235]">
        <div className="flex flex-col gap-3 border-b-[1px] p-5">
          <h1 className="font-bold uppercase">Tour Details</h1>

          <h2 className="text-[#909090] text-sm ">
            these are the details that will be shown in cart section.
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Country <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomSelect
                      placeHolder="Country"
                      name="country"
                      required={false}
                      options={countriesList}
                      defaultValue={getValue(packageDetails, "country")}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Title <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomInput
                      type="text"
                      placeHolder="Title"
                      name="title"
                      required={true}
                      defaultValue={getValue(packageDetails, "title")}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Is Top Destination
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    {isTopDestination ? (
                      <FaToggleOn onClick={handleClickOpenClose} size={28} className="text-blue-500" />
                    ) : (
                      <FaToggleOff onClick={handleClickOpenClose} size={28} className="text-green-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold pb-2 text-sm">
                Image <span className="text-red-500">*</span>
              </div>

              <div className="flex flex-col md:flex-row gap-5 ">
                <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                  <UploadImage
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold pb-2 text-sm">
                Description <span className="text-red-500">*</span>
              </div>

              <div className="flex flex-col md:flex-row gap-5 ">
                <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                  <CustomTextArea
                    placeHolder="short description"
                    name="short_description"
                    required={false}
                    defaultValue={getValue(
                      packageDetails,
                      "trip_highlight_text"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Start Date <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <StartDate
                      defaultValue={getValue(packageDetails, "start_date")}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  End Date <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <EndDate
                      defaultValue={getValue(packageDetails, "expiry_date")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Start Place <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomInput
                      type="text"
                      placeHolder="Start Place"
                      name="start_place"
                      required={true}
                      defaultValue={getValue(packageDetails, "start_location")}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  End Place <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomInput
                      type="text"
                      placeHolder="End Place"
                      name="end_place"
                      required={true}
                      defaultValue={getValue(packageDetails, "end_location")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetails;
