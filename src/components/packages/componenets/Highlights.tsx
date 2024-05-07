import { Dispatch, SetStateAction } from 'react';
import Highlights from "../../form/highlights";

interface Props {
  setHighlights: Dispatch<SetStateAction<string[]>>;
  highlights: string[];
  packageDetails?: any;
}

const HighlightsPackages: React.FC<Props> = ({ setHighlights, highlights }) => {
  
  return (
    <div className="flex flex-col gap-3 mb-5    shadow bg-white rounded dark:bg-[#182235] ">
      <div className="flex flex-col gap-3 border-b-[1px] p-5">
        <h1 className="font-bold uppercase">HighLights</h1>
        <h2 className="text-[#909090] text-sm"></h2>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 p-5">
          <div>
            <div className="font-semibold pb-2 text-sm">Highlights</div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-5">
              <Highlights
                type="text"
                placeHolder="add highlights"
                required={true}
                setHighlights={setHighlights}
                highlights={highlights}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightsPackages;
