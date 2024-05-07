import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Props {
  placeHolder: string;
  type: string;
  required?: boolean;
  setHighlights: (val: any) => unknown;
  includedList: string[];
}

const WhatsIncluded: React.FC<Props> = ({
  placeHolder,
  type,
  required,
  includedList,
  setHighlights,
}) => {
  const [listHighlights, setListHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [highLightsLength, setHighLightsLength] = useState(includedList.length);

  const validationRules: {
    [key: string]: string | { value: RegExp; message: string };
  } = {};

  if (required) {
    validationRules.required = "This field is required";
  }

  const handleAddHighlight = () => {
    if (newHighlight.trim() !== "") {
      setListHighlights([...listHighlights, newHighlight]);
      setHighlights((prev: any) => ({
        ...prev,
        [highLightsLength]: newHighlight,
      }));
      setNewHighlight("");
      setHighLightsLength((prev) => prev + 1);
    }
  };

  const handleDeleteHighlight = (index: number) => {
    setHighlights((prev: any) => ({ ...prev, [index]: "" }));
  };

  const handleEditHighlight = (index: number) => {
    setEditIndex(index);
    setNewHighlight(includedList[index]);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && newHighlight.trim() !== "") {
      const newList = [...includedList];
      newList[editIndex] = newHighlight;
      setHighlights((prev: any) => ({ ...prev, [editIndex]: newHighlight }));
      setNewHighlight("");
      setEditIndex(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 ">
      <div className="flex gap-2 w-full rounded-md">
        <input
          type={type}
          value={newHighlight}
          onChange={(e) => setNewHighlight(e.target.value)}
          className="w-full outline-none py-2 px-4 rounded-md   text-sm  text-slate-500 dark:bg-[#182235]"
          placeholder={placeHolder}
        />
        <div className="flex items-center gap-2">
          <div
            className="h-10 w-10 bg-green-600 rounded-md flex items-center justify-center cursor-pointer"
            onClick={editIndex !== null ? handleSaveEdit : handleAddHighlight}
          >
            {editIndex !== null ? (
              <FaEdit className="text-white" />
            ) : (
              <FaPlus className="text-white" />
            )}
            {/* Change icon based on edit mode */}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        {includedList.map((item, index) => {
          if (!item) return
          return (
            <div key={index} className="w-full justify-between flex gap-5 pt-5">
              <div className="text-[#909090] text-sm">{item}</div>
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 bg-green-600 rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() => handleDeleteHighlight(index)}
                >
                  <FaTrash className=" text-white" />
                </div>
                <div
                  className="h-10 w-10 bg-green-600 rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() => handleEditHighlight(index)}
                >
                  <FaEdit className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsIncluded;
