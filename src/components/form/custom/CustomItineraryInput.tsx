import { useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: string;
  name: string;
  placeHolder: string;
  type: string;
  required?: boolean;
  handleChange: (val: string, index: number, name: string) => void;
  day: number;
}

const CustomItineraryInput: React.FC<Props> = ({
  defaultValue,
  name,
  placeHolder,
  type,
  handleChange,
  required,
  day,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validationRules: {
    [key: string]: string | { value: RegExp; message: string };
  } = {};

  if (required) {
    validationRules.required = "This field is required";
  }

  if (type === "email") {
    validationRules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    };
  }

  return (
    <div className="flex flex-col gap-2 w-full rounded-md   ">
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full outline-none py-2 px-4 rounded-md   text-sm  text-slate-500 dark:bg-[#182235] border-gray-200
        dark:border-gray-500  "
        placeholder={placeHolder}
        {...register(name, validationRules)}
        onChange={(e)=>{
            handleChange(e.target.value, day, e.target.name);
        }}
      />
      {required && errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default CustomItineraryInput;
