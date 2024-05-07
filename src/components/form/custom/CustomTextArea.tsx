import { useFormContext } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeHolder: string;
  required?: boolean;
}

const CustomTextArea: React.FC<Props> = ({
  defaultValue,
  name,
  placeHolder,
  required,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 w-full   ">
      <textarea
        defaultValue={defaultValue}
        className="w-full outline-none py-2 px-4  rounded-md  text-sm  text-slate-700 h-[80px] dark:bg-[#182235] border-gray-200
        dark:border-gray-500"
        placeholder={placeHolder}
        {...register(name, {
          required: required ? "This field is required" : false,
        })}
        {...rest}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default CustomTextArea;
