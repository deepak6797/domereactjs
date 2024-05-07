import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export interface Option {
  continent_name: string;
  name: string;
  id: string;
}

interface Props {
  defaultValue?: string;
  name: string;
  placeHolder: string;
  style?: boolean;
  options?: Option[];
  required?: boolean;
  setContinentId?: (value: string) => void;
}

const CustomSelectContinent: React.FC<Props> = ({
  defaultValue,
  name,
  placeHolder,
  style,
  options,
  required,
  setContinentId,
}) => {
  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    const selectedId = options?.find(
      (item: any) => item.name === selectedOption
    );
    if (setContinentId && selectedId) {
      setContinentId(selectedId.id);
    }
  };

  useEffect(() => {
    if(defaultValue){
      setValue(name, defaultValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, name])
  

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className={`${
          style ? "w-full" : "w-auto"
        } flex flex-col h-fit rounded-md  pr-2`}
      >
        <select
          defaultValue={defaultValue}
          className={`w-full outline-none py-2 pl-4 rounded-md  dark:bg-[#182235] border-gray-200
          dark:border-gray-500  text-sm text-slate-600  `}
          {...register(`${name}`, {
            required: required ? "This field is required" : false,
          })}
          onChange={handleChange}
        >
          <option value="" hidden>
            {placeHolder}
          </option>
          {options?.map((item) => (
            <option value={item.name} key={item.name}>
              {item.continent_name}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default CustomSelectContinent;
