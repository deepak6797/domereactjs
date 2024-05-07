import { useGetAllAccommodation } from "../../../hooks/accommodation.hook";
import { useGetAllActivities } from "../../../hooks/activities.hook";
import { useGetAllAgeRange } from "../../../hooks/agerange.hook";
import { useGetAllTourType } from "../../../hooks/tourtype.hook";
import { useGetAllTransport } from "../../../hooks/transport.hook";
import { getValue } from "../../../utils/object";
import CustomSelect from "../../form/custom/CustomInputSelect";

const operatedIn = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "Nepali",
    label: "Nepali",
  },
];

interface Props {
  setActivities: (val: any) => void;
  selectedActivities?: string;
  packageDetails?: any;
}

const Attributes: React.FC<Props> = ({
  setActivities,
  packageDetails,
}) => {
  const { data: allTourType } = useGetAllTourType();
  const { data: allAccommodation } = useGetAllAccommodation();
  const { data: allActivities } = useGetAllActivities();
  const { data: allAgeRange } = useGetAllAgeRange();
  const { data: allTransport } = useGetAllTransport();

  

  const storeTourType: any = [];
  allTourType &&
    allTourType?.results?.map((item: any) => {
      const formatTourType = { label: item.name, value: item.id };
      storeTourType.push(formatTourType);
    });

  const storeAccommodation: any = [];
  allAccommodation &&
    allAccommodation?.results?.map((item: any) => {
      const formatTourType = { label: item.name, value: item.id };
      storeAccommodation.push(formatTourType);
    });

  const storeActivities: any = [];
  allActivities &&
    allActivities?.results?.map((item: any) => {
      const formatTourType = { label: item.name, value: item.id };
      storeActivities.push(formatTourType);
    });

  const storeAgeRange: any = [];
  allTourType &&
    allAgeRange?.results?.map((item: any) => {
      const formatTourType = { label: item.range, value: item.id };
      storeAgeRange.push(formatTourType);
    });

  const storeTransport: any = [];
  allTransport &&
    allTransport?.results?.map((item: any) => {
      const formatTourType = { label: item.name, value: item.id };
      storeTransport.push(formatTourType);
    });

  const onActivitiesChange = (val: string) => {
    const activity = storeActivities.find((data: any) => (data.value = val));
    setActivities((prev: any) => [...prev, { name: activity.label }]);
  };


  return (
    <div className="flex flex-col  gap-3 mb-5   shadow bg-white rounded dark:bg-[#182235] ">
      <div className="flex flex-col gap-3 border-b-[1px] p-5">
        <h1 className="font-bold uppercase">Attributes</h1>

        <h2 className="text-[#909090] text-sm">
          Your contact details are only shared with the tour provider you book
          with.
        </h2>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5 p-5">
        <div className="w-full">
          <div className="font-semibold pb-2 text-sm">
            Tour Type <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
              <CustomSelect
                placeHolder="tour type"
                name="tour_type"
                options={storeTourType || []}
                required={true}
                defaultValue={getValue(packageDetails, "tour_type.id")}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold pb-2 text-sm">
            Accommodation <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
              <CustomSelect
                placeHolder="accomodation"
                name="accommodation"
                options={storeAccommodation || []}
                required={true}
                defaultValue={getValue(packageDetails, "accommodation.id")}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold pb-2 text-sm">
            Operated In <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
              <CustomSelect
                placeHolder="operated in"
                name="operated_in"
                options={operatedIn}
                required={true}
                defaultValue={getValue(packageDetails, "operated_in")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5 p-5">
        <div className="w-full">
          <div className="font-semibold pb-2 text-sm">
            Activities <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
              <CustomSelect
                placeHolder="activities"
                name="activities"
                options={storeActivities || []}
                required={true}
                handleChange={onActivitiesChange}
                defaultValue={getValue(packageDetails, "activities[0].id")}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold pb-2 text-sm">
            Transport <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
              <CustomSelect
                placeHolder="transport"
                name="transport"
                options={storeTransport || []}
                required={true}
                defaultValue={getValue(packageDetails, "transport.id")}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold pb-2 text-sm">
            Age Range <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
              <CustomSelect
                placeHolder="age range"
                name="age_range"
                options={storeAgeRange || []}
                required={true}
                defaultValue={getValue(packageDetails, "age_range.id")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
