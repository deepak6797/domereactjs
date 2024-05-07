import { useFormContext } from "react-hook-form";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  defaultValue?: string;
  name: string;
  placeHolder: string;
  style?: boolean;
  options?: Option[];
  required?: boolean;
  setContinentId?: (value: string) => void;
  handleChange?: (val: string) => void;
  setSelectValue?: any;
}

const CustomSelect: React.FC<Props> = ({
  defaultValue,
  name,
  placeHolder,
  style,
  options,
  setContinentId,
  required,
  handleChange,
  setSelectValue,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    if (handleChange) {
      handleChange(selectedOption);
      setSelectValue(selectedOption);
    }

    if (setContinentId) {
      setContinentId(selectedOption);
      setSelectValue(selectedOption);
    }
  };

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
          dark:border-gray-500  text-sm text-slate-500   `}
          {...register(`${name}`, {
            required: required ? "This field is required" : false,
          })}
          onChange={onChange}
        >
          <option value="" hidden>
            {placeHolder}
          </option>
          {options?.map((item) => (
            <option
              value={item.value}
              key={item.value}
              selected={item.value === defaultValue}
            >
              {item.label}
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

export default CustomSelect;
