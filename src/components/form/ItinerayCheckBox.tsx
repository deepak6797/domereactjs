import React, { useState } from "react";
import { useFormContext } from "react-hook-form";



interface Props {
  defaultValue?: string[];
  name: string;
  style?: boolean;
  required?: boolean;
  choiceData: string[];
  handleChange: (val: any[], index: number, name: string) => void;
  day: number;
}

const CustomCheckboxItinerary: React.FC<Props> = ({
  name,
  style,
  required,
  choiceData,
  handleChange,
  day,
  defaultValue
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedOptions, setSelectedOptions] = useState<any[]>(defaultValue || []);

  const isChecked = (itemName: string) => {
    return selectedOptions.find((data) => data?.name === itemName)
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, {name: value}]);
      handleChange([...selectedOptions, {
        name: value
      }], day, e.target.name)
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
      const options = [...selectedOptions].filter((option:any) => option?.name !== value)
      handleChange(options, day, e.target.name)
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className={`${
          style ? "w-full" : "w-auto"
        } flex flex-col h-fit rounded-md  pr-2`}
      >
        {choiceData &&
          choiceData.map((item: any) => (
            <label key={item.value} className="flex items-center text-sm">
              <input
                type="checkbox"
                value={item.label}
                className="mr-2"
                {...register(name, {
                  required: required
                    ? "At least one option is required"
                    : false,
                })}
                checked={isChecked(item.label)}
                onChange={handleCheckboxChange}
              />
              {item.label}
            </label>
          ))}
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default CustomCheckboxItinerary;
