import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { useState } from "react";
import Itinerary from "../../components/packages/Itinerary";
import TourDetails from "../../components/packages/componenets/TourDetails";
import Attributes from "../../components/packages/componenets/Attributes";
import HighlightsPackages from "../../components/packages/componenets/Highlights";
import IncludedExcluded from "../../components/packages/componenets/IncludedExcluded";
import { getValue } from "../../utils/object";
import PricingDetails from "../../components/packages/componenets/PricingDetails";
import { useCreatePackages } from "../../hooks/package.hook";
import { formatDate } from "../../utils/date";

const AddPackage = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const { trigger } = methods;
  const { isValid } = useFormState({ control: methods.control });
  const [currentStep, setCurrentStep] = useState(0);
  const [highlights, setHighlights] = useState({});
  const [included, setIncluded] = useState({});
  const [excluded, setExcluded] = useState({});
  const [isTopDestination, setIsTopDestination] = useState<boolean>(false);

  const [itineraryData, setItineraryData] = useState({});
  const [itineraryDays, setItineraryDays] = useState<number[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>("");

  const [activities, setActivities] = useState([]);

  const handleAddDays = () => {
    const newData = [...itineraryDays, itineraryDays.length + 1];
    setItineraryDays(newData);
  };

  const handleRemoveDays = (day: number) => {
    const newDays = [...itineraryDays].filter((data) => data < day);
    setItineraryDays(newDays);
    setItineraryData((prev) => ({ ...prev, [day]: "" }));
  };

  const { mutateAsync: onPackageAdd, isPending } = useCreatePackages();

  const highlightsList = Object.values(highlights) as string[];
  const includedList = Object.values(included) as string[];
  const excludedList = Object.values(excluded) as string[];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const resData = {
      activities: activities,
      accommodation: getValue(data, "accommodation"),
      age_range: getValue(data, "age_range"),
      destination: getValue(data, "age_range"),
      expiry_date: formatDate(getValue(data, "end_date")),
      start_date: formatDate(getValue(data, "start_date")),
      title: getValue(data, "title"),
      transport: getValue(data, "transport"),
      tour_type: getValue(data, "tour_type"),
      start_location: getValue(data, "start_place"),
      end_location: getValue(data, "end_place"),
      operated_in: getValue(data, "operated_in"),
      trip_highlight_text: getValue(data, "short_description"),
      highlights: highlightsList.filter((data) => !!data).join(","),
      included_itinerary: includedList.filter((data) => !!data).join(","),
      is_top_destination: isTopDestination,
      excluded_itinerary: excludedList.filter((data) => !!data).join(","),
      day_plans: Object.values(itineraryData),
      price: getValue(data, "price"),
      discount_percent: getValue(data, "discount_percent"),
      seats: getValue(data, "seats"),
      suitable_for: "family",
      images: [
        {
          image: selectedImage,
        },
      ],
      country: getValue(data, "country"),
    };

    await onPackageAdd(resData);
  };

  const handleClickOpenClose = () => {
    setIsTopDestination((prev) => !prev);
  };

  const handleNextStep = async () => {
    if (currentStep === 2) {
      setCurrentStep((prevStep) => prevStep + 1);
      return;
    } else {
      await trigger();
      if (isValid) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  const renderCurrentTab = () => {
    switch (currentStep) {
      case 0:
        return (
          <TourDetails
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            handleClickOpenClose={handleClickOpenClose}
            isTopDestination={isTopDestination}
          />
        );
      case 1:
        return <PricingDetails />;
      case 2:
        return <Attributes setActivities={setActivities} />;
      case 3:
        return (
          <HighlightsPackages
            setHighlights={setHighlights}
            highlights={highlightsList}
          />
        );
      case 4:
        return (
          <IncludedExcluded
            setExcluded={setExcluded}
            setIncluded={setIncluded}
            includedList={includedList}
            excludedList={excludedList}
          />
        );
      case 5:
        return (
          <div className="flex flex-col gap-3 mb-5 shadow bg-white rounded dark:bg-[#182235]">
            <div className="flex flex-col gap-3 border-b-[1px] p-5">
              <h1 className="font-bold uppercase">Itinerary</h1>
            </div>
            <Itinerary
              itinerary={itineraryData}
              updateItinerary={setItineraryData}
              handleAddDays={handleAddDays}
              handleRemoveDays={handleRemoveDays}
              itineraryDays={itineraryDays}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmitForm = () => {
    methods.handleSubmit(onSubmit)();
  };

  return (
    <div className="py-10 px-0 md:px-5">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-5 ">
          <div className="flex gap-5 ">
            <div
              className={`${currentStep === 0 ? "font-semibold" : "text-sm"}`}
              onClick={() => setCurrentStep(0)}
            >
              Tour Details
            </div>
            <div
              className={`${currentStep === 1 ? "font-semibold" : "text-sm"}`}
              onClick={() => setCurrentStep(1)}
            >
              Pricing
            </div>
            <div
              className={`${currentStep === 2 ? "font-semibold" : "text-sm"}`}
              onClick={() => setCurrentStep(2)}
            >
              Attributes
            </div>
            <div
              className={`${currentStep === 3 ? "font-semibold" : "text-sm"}`}
              onClick={() => setCurrentStep(3)}
            >
              Highlights
            </div>
            <div
              className={`${currentStep === 4 ? "font-semibold" : "text-sm"}`}
              onClick={() => setCurrentStep(4)}
            >
              Included/Excluded
            </div>
            <div
              className={`${currentStep === 5 ? "font-semibold" : "text-sm"}`}
              onClick={() => setCurrentStep(5)}
            >
              Itinerary
            </div>
          </div>
          {renderCurrentTab()}
          {currentStep !== 5 && (
            <button
              type="button"
              onClick={() => handleNextStep()}
              className="w-full md:w-auto py-3 px-5 border-[#3DB367] border-[0.1px] text-sm text-white bg-[#3DB367] rounded-md"
            >
              Next
            </button>
          )}

          {currentStep === 5 && (
            <button
              type="button"
              className="w-full md:w-auto py-3 px-5 border-[#3DB367] border-[0.1px] text-sm text-white bg-[#3DB367] rounded-md"
              disabled={isPending}
              onClick={handleSubmitForm}
            >
              Add Package
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPackage;
