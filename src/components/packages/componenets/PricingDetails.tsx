import { getValue } from "../../../utils/object";
import CustomInput from "../../form/custom/CustomInput";

interface Props {
  packageDetails?: any;
}
const PricingDetails:React.FC<Props> = ({ packageDetails }) => {
  return (
    <>
      <div className="flex flex-col  gap-3 my-5  shadow bg-white rounded  dark:bg-[#182235]">
        <div className="flex flex-col gap-3 border-b-[1px] p-5">
          <h1 className="font-bold uppercase">Pricing Details</h1>

          <h2 className="text-[#909090] text-sm ">
            these are the details that will be shown in cart section.
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Price <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomInput
                      type="text"
                      placeHolder="$1000"
                      name="price"
                      required={true}
                      defaultValue={getValue(packageDetails, "price")}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Discount <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomInput
                      type="text"
                      placeHolder="$100"
                      name="discount_percent"
                      required={true}
                      defaultValue={getValue(
                        packageDetails,
                        "discount_percent"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <div className="font-semibold pb-2 text-sm">
                  Seat <span className="text-red-500">*</span>
                </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className="w-full flex flex-col gap-5 md:gap-2 md:flex-row">
                    <CustomInput
                      type="text"
                      placeHolder="5"
                      name="seats"
                      required={true}
                      defaultValue={getValue(packageDetails, "seats")}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingDetails;
