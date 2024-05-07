import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  continent_name: string;
  name: string;
}

interface choiceOptionProps {
  name: string;
  code: string;
}

interface Props {
  defaultValue?: string[];
  name: string;
  style?: boolean;
  required?: boolean;
  continentData: Option[];
  choiceData: choiceOptionProps[];
}

const CustomCheckbox: React.FC<Props> = ({
  name,
  style,
  required,
  continentData,
  choiceData,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const matchingChoices = choiceData
      .filter((choice) =>
        continentData.some(
          (continent) => continent.continent_name === choice.name
        )
      )
      .map((choice) => choice.name);

    setSelectedOptions(matchingChoices);
  }, [continentData, choiceData]);

  const isChecked = (itemName: string) => {
    return selectedOptions.includes(itemName);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
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
            <label key={item.code} className="flex items-center">
              <input
                type="checkbox"
                value={item.name}
                className="mr-2"
                {...register(name, {
                  required: required
                    ? "At least one option is required"
                    : false,
                })}
                checked={isChecked(item.name)}
                onChange={handleCheckboxChange}
              />
              {item.name}
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

export default CustomCheckbox;
