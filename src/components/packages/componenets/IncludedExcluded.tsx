import WhatsExcluded from "../../form/WhatsExcluded";
import WhatsIncluded from "../../form/WhatsIncluded";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIncluded: Dispatch<SetStateAction<string[]>>;
  setExcluded: Dispatch<SetStateAction<string[]>>;
  excludedList: string[]
  includedList: string[]
  packageDetails?: any;
}

const IncludedExcluded: React.FC<Props> = ({includedList,excludedList, setIncluded, setExcluded }) => {
 
  return (
    <div className="flex flex-col  gap-3 mb-5    shadow bg-white rounded dark:bg-[#182235] ">
      <div className="flex flex-col gap-3 border-b-[1px] p-5">
        <h1 className="font-bold uppercase">Whats Included & Excluded</h1>

        <h2 className="text-[#909090] text-sm"></h2>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 p-5">
          <div>
            <div className="font-semibold pb-2 text-sm">Whats Included</div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-5">
              <WhatsIncluded
                type="text"
                placeHolder="add highlights"
                required={true}
                setHighlights={setIncluded || []}
                includedList={includedList}
              />
            </div>
          </div>

          <div>
            <div className="font-semibold pb-2 text-sm">Whats Excluded</div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-5">
              <WhatsExcluded
                type="text"
                placeHolder="add highlights"
                required={true}
                setHighlights={setExcluded || []}
                excludedList={excludedList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncludedExcluded;
