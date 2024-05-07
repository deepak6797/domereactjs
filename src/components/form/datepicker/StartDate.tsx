import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: string;
}

const StartDate: React.FC<Props> = ({ defaultValue }) => {
  const { control } = useFormContext();


  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className="w-full flex border-[1px] border-gray-200
        dark:border-gray-500 items-center pr-1 px-2 gap-2 rounded-md"
      >
        <div className="text-lg">
          <CiCalendarDate />
        </div>
        <Controller
          control={control}
          name="start_date"
          defaultValue={defaultValue ? new Date(defaultValue) : new Date()}
          render={({ field: { onChange: onDateChange, value } }) => (
            <ReactDatePicker
              dateFormat="yyyy-MM-dd"
              onChange={(dateVal: Date) => {
                onDateChange(dateVal);
              }}
              selected={value as unknown as Date}
              customInput={
                <input className="w-full outline-none dark:bg-[#182235] border-none" />
              }
              placeholderText={"Select Specific Date"}
              autoComplete="off"
              className="w-full text-sm text-gray-400"
              wrapperClassName="w-full border-none outline-none dark:bg-[#182235]"
            />
          )}
        />
      </div>
    </div>
  );
};

export default StartDate;
