import React, { useMemo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import CustomCheckboxItinerary from "../form/ItinerayCheckBox";
import { useGetAllAccommodation } from "../../hooks/accommodation.hook";
// import LocationVisited from "../form/LocationVisited";
import CustomItineraryInput from "../form/custom/CustomItineraryInput";
import CustomItineraryTextArea from "../form/custom/CustomItineraryTextArea";
import CustomItinerarySelect from "../form/custom/CustomItinerarySelect";
import { useGetAllMeals } from "../../hooks/meals.hook";
import { getValue } from "../../utils/object";

interface Props {
  itinerary: any; // Specify the type of itinerary
  updateItinerary: (newItinerary: any) => unknown; // Specify the type of updateItinerary function
  handleAddDays: () => unknown;
  handleRemoveDays: (day: number) => unknown;
  itineraryDays: number[];
  packageDetails?: any;
}

const Itinerary: React.FC<Props> = ({
  itinerary,
  updateItinerary,
  handleAddDays,
  handleRemoveDays,
  itineraryDays,
}) => {
  // const [locationVisited, setLocationVisited] = useState<string[]>([]);

  const { data: allAccommodation } = useGetAllAccommodation();

  const { data: allMeals } = useGetAllMeals();

  const mealsList = useMemo(() => {
    if (allMeals && allMeals.results) {
      return getValue(allMeals, "results", []).map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
    }
  }, [allMeals]);

  // console.log({ locationVisited });

  const storeAccommodation: any = [];
  allAccommodation &&
    allAccommodation?.results?.map((item: any) => {
      const formatTourType = { label: item.name, value: item.id };
      storeAccommodation.push(formatTourType);
    });

  const getKeyName = (name: string) => {
    if (name.includes("day_number")) {
      return "day_number";
    }

    if (name.includes("description")) {
      return "description";
    }

    if (name.includes("accommodation")) {
      return "accommodation";
    }

    if (name.includes("location")) {
      return "location";
    }

    if (name.includes("meals_offered")) {
      return "meals_offered";
    }

    if (name.includes("title")) {
      return "title";
    }

    return "";
  };

  const handleItineraryDataChange = (
    val: string | string[],
    day: number,
    name: string
  ) => {
    const datas = itinerary[day] ?? {};
    const keyName = getKeyName(name);
    updateItinerary((prev: any) => ({
      ...prev,
      [day]: {
        ...datas,
        [keyName]: val,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        {itineraryDays.map((day: any) => {
          const currentItinerary = itinerary[day] ?? {};
          return (
            <div key={day} className="p-4 mb-2 border rounded shadow-sm">
              <div className="w-full flex justify-between py-5">
                <div className="flex mb-2 font-semibold text-sm">Day {day}</div>
                <button
                  className="bg-red-500 p-2 rounded-full"
                  type="button"
                  onClick={() => handleRemoveDays(day)}
                >
                  <FaMinus color="white" />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <CustomItineraryInput
                    type="number"
                    name={`day-${day}-day_number`} // Use unique names for each field
                    placeHolder="Enter Day Number"
                    required={true}
                    day={day}
                    handleChange={handleItineraryDataChange}
                    defaultValue={currentItinerary[`day_number`]}
                  />

                  <CustomItineraryInput
                    type="text"
                    name={`day-${day}-title`} //
                    placeHolder="Enter Title"
                    required={true}
                    day={day}
                    handleChange={handleItineraryDataChange}
                    defaultValue={currentItinerary[`title`]}
                  />
                </div>

                <CustomItineraryTextArea
                  name={`day-${day}-description`} // Use unique names for each field
                  placeHolder="description"
                  required={true}
                  day={day}
                  handleChange={handleItineraryDataChange}
                  defaultValue={currentItinerary[`description`]}
                />

                <div className="flex flex-col gap-2 ">
                  <div className="font-semibold text-sm">Accommodations</div>
                  <CustomItinerarySelect
                    placeHolder="accommodation"
                    name={`day-${day}-accommodation`} // Use unique names for each field
                    options={storeAccommodation || []}
                    required={false}
                    day={day}
                    handleChange={handleItineraryDataChange}
                    defaultValue={currentItinerary[`accommodation`]}
                  />
                </div>

                {/* <div className="flex flex-col gap-2 ">
                  <div className="font-semibold text-sm">Location Visited</div>
                  <LocationVisited
                    type="text"
                    placeHolder="add visiting location"
                    required={true}
                    day={day}
                    // setLocationVisited={setLocationVisited}
                    handleChange={handleItineraryDataChange}
                    defaultValue={currentItinerary[`location`]}
                  />
                </div> */}

                <div className="flex flex-col gap-2 ">
                  <div className="font-semibold text-sm">Meals</div>
                  <CustomCheckboxItinerary
                    name={`day-${day}-meals_offered`} // Use unique names for each field
                    choiceData={mealsList}
                    day={day}
                    handleChange={handleItineraryDataChange}
                    defaultValue={currentItinerary[`meals_offered`]}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-5 px-5">
        <div className="text-gray-400 text-sm">Add Multiple Days</div>
        <button
          className="bg-red-500 p-2 rounded-full"
          type="button"
          onClick={handleAddDays}
        >
          <FaPlus color="white" />
        </button>
      </div>
    </div>
  );
};

export default Itinerary;
